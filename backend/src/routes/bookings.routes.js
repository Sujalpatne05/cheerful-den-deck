import express from 'express';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all bookings
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT b.*, 
              json_agg(json_build_object('id', r.id, 'number', r.number, 'type', r.type)) as rooms
       FROM bookings b
       LEFT JOIN booking_rooms br ON b.id = br.booking_id
       LEFT JOIN rooms r ON br.room_id = r.id
       WHERE b.user_id = $1
       GROUP BY b.id
       ORDER BY b.created_at DESC`,
      [req.user.id]
    );
    res.json({ bookings: result.rows });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single booking
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT b.*, 
              json_agg(json_build_object('id', r.id, 'number', r.number, 'type', r.type)) as rooms
       FROM bookings b
       LEFT JOIN booking_rooms br ON b.id = br.booking_id
       LEFT JOIN rooms r ON br.room_id = r.id
       WHERE b.id = $1 AND b.user_id = $2
       GROUP BY b.id`,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ booking: result.rows[0] });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create booking
router.post('/', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    const { 
      booking_ref, guest_name, guest_email, guest_phone, 
      check_in, check_out, status, total_cost, notes, room_ids 
    } = req.body;

    if (!booking_ref || !guest_name || !check_in || !check_out || !total_cost) {
      await client.query('ROLLBACK');
      return res.status(400).json({ 
        error: 'Required fields: booking_ref, guest_name, check_in, check_out, total_cost' 
      });
    }

    // Insert booking
    const bookingResult = await client.query(
      `INSERT INTO bookings (booking_ref, guest_name, guest_email, guest_phone, check_in, check_out, status, total_cost, notes, user_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [booking_ref, guest_name, guest_email, guest_phone, check_in, check_out, status || 'Confirmed', total_cost, notes, req.user.id]
    );

    const booking = bookingResult.rows[0];

    // Insert booking-room relationships
    if (room_ids && Array.isArray(room_ids) && room_ids.length > 0) {
      for (const room_id of room_ids) {
        await client.query(
          'INSERT INTO booking_rooms (booking_id, room_id) VALUES ($1, $2)',
          [booking.id, room_id]
        );
      }
    }

    await client.query('COMMIT');

    res.status(201).json({ 
      message: 'Booking created successfully',
      booking 
    });
  } catch (error) {
    await client.query('ROLLBACK');
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Booking reference already exists' });
    }
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

// Update booking
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { guest_name, guest_email, guest_phone, check_in, check_out, status, total_cost, notes } = req.body;

    const result = await pool.query(
      `UPDATE bookings 
       SET guest_name = COALESCE($1, guest_name),
           guest_email = COALESCE($2, guest_email),
           guest_phone = COALESCE($3, guest_phone),
           check_in = COALESCE($4, check_in),
           check_out = COALESCE($5, check_out),
           status = COALESCE($6, status),
           total_cost = COALESCE($7, total_cost),
           notes = COALESCE($8, notes),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $9 AND user_id = $10
       RETURNING *`,
      [guest_name, guest_email, guest_phone, check_in, check_out, status, total_cost, notes, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ 
      message: 'Booking updated successfully',
      booking: result.rows[0] 
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete booking
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM bookings WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
