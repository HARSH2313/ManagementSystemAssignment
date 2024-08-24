const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(results);
  });
});

// Add a new user
router.post('/', (req, res) => {
  const { username, password, role } = req.body;
  const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
  db.query(query, [username, password, role], (err, results) => {
    if (err) {
      console.error('Error adding user:', err);
      return res.status(400).send(err.message);
    }
    res.status(201).json({
      id: results.insertId,
      username,
      role
    });
  });
});

// Update a user
router.put('/:id', (req, res) => {
  const { username, password, role } = req.body;
  const query = 'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?';
  db.query(query, [username, password, role, req.params.id], (err, results) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(400).send(err.message);
    }
    res.json({
      id: req.params.id,
      username,
      role
    });
  });
});

// Delete a user
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(400).send(err.message);
    }
    res.sendStatus(200);
  });
});

module.exports = router;
