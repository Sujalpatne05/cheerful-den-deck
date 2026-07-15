import express from 'express';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all housekeeping tasks
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM housekeeping WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json({ tasks: result.rows });
  } catch (error) {
    console.error('Get housekeeping tasks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create housekeeping task
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { room_number, task, assigned_to, priority, status, notes } = req.body;

    if (!room_number || !task) {
      return res.status(400).json({ error: 'Room number and task are required' });
    }

    const result = await pool.query(
      `INSERT INTO housekeeping (room_number, task, assigned_to, priority, status, notes, user_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [room_number, task, assigned_to, priority || 'Medium', status || 'Pending', notes, req.user.id]
    );

    res.status(201).json({ task: result.rows[0] });
  } catch (error) {
    console.error('Create housekeeping task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update housekeeping task
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { room_number, task, assigned_to, priority, status, notes } = req.body;

    const result = await pool.query(
      `UPDATE housekeeping 
       SET room_number = COALESCE($1, room_number),
           task = COALESCE($2, task),
           assigned_to = COALESCE($3, assigned_to),
           priority = COALESCE($4, priority),
           status = COALESCE($5, status),
           notes = COALESCE($6, notes),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7 AND user_id = $8
       RETURNING *`,
      [room_number, task, assigned_to, priority, status, notes, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ task: result.rows[0] });
  } catch (error) {
    console.error('Update housekeeping task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete housekeeping task
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM housekeeping WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete housekeeping task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
