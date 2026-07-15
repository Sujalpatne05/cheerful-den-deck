import express from 'express';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all rooms
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM rooms ORDER BY number ASC'
    );
    res.json({ rooms: result.rows });
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single room
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM rooms WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json({ room: result.rows[0] });
  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create room
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { number, type, floor, status, price, guest, image_url } = req.body;

    if (!number || !type || floor === undefined || !price) {
      return res.status(400).json({ 
        error: 'Number, type, floor, and price are required' 
      });
    }

    const result = await pool.query(
      `INSERT INTO rooms (number, type, floor, status, price, guest, image_url) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [number, type, floor, status || 'Available', price, guest, image_url]
    );

    res.status(201).json({ 
      message: 'Room created successfully',
      room: result.rows[0] 
    });
  } catch (error) {
    if (error.code === '23505') { // Unique violation
      return res.status(400).json({ error: 'Room number already exists' });
    }
    console.error('Create room error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update room
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { number, type, floor, status, price, guest, image_url } = req.body;

    const result = await pool.query(
      `UPDATE rooms 
       SET number = COALESCE($1, number),
           type = COALESCE($2, type),
           floor = COALESCE($3, floor),
           status = COALESCE($4, status),
           price = COALESCE($5, price),
           guest = $6,
           image_url = COALESCE($7, image_url),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
      [number, type, floor, status, price, guest, image_url, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json({ 
      message: 'Room updated successfully',
      room: result.rows[0] 
    });
  } catch (error) {
    console.error('Update room error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete room
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM rooms WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
