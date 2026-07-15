import express from 'express';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all invoices
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM invoices WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json({ invoices: result.rows });
  } catch (error) {
    console.error('Get invoices error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single invoice
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM invoices WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    res.json({ invoice: result.rows[0] });
  } catch (error) {
    console.error('Get invoice error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create invoice
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { invoice_number, booking_id, guest_name, amount, status, payment_method, payment_date } = req.body;

    if (!invoice_number || !guest_name || !amount) {
      return res.status(400).json({ error: 'Invoice number, guest name, and amount are required' });
    }

    const result = await pool.query(
      `INSERT INTO invoices (invoice_number, booking_id, guest_name, amount, status, payment_method, payment_date, user_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [invoice_number, booking_id, guest_name, amount, status || 'Pending', payment_method, payment_date, req.user.id]
    );

    res.status(201).json({ invoice: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Invoice number already exists' });
    }
    console.error('Create invoice error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update invoice
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { guest_name, amount, status, payment_method, payment_date } = req.body;

    const result = await pool.query(
      `UPDATE invoices 
       SET guest_name = COALESCE($1, guest_name),
           amount = COALESCE($2, amount),
           status = COALESCE($3, status),
           payment_method = COALESCE($4, payment_method),
           payment_date = COALESCE($5, payment_date),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [guest_name, amount, status, payment_method, payment_date, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    res.json({ invoice: result.rows[0] });
  } catch (error) {
    console.error('Update invoice error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete invoice
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM invoices WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Delete invoice error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
