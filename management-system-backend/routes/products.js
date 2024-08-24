const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all products
router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(results);
  });
});

// Add a new product
router.post('/', (req, res) => {
  const { name, description, price, stock, category } = req.body;
  const query = 'INSERT INTO products (name, description, price, stock, category) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, description, price, stock, category], (err, results) => {
    if (err) {
      console.error('Error adding product:', err);
      return res.status(400).send(err.message);
    }
    res.status(201).json({
      id: results.insertId,
      name,
      description,
      price,
      stock,
      category
    });
  });
});

// Update a product
router.put('/:id', (req, res) => {
  const { name, description, price, stock, category } = req.body;
  const query = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ? WHERE id = ?';
  db.query(query, [name, description, price, stock, category, req.params.id], (err, results) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(400).send(err.message);
    }
    res.json({
      id: req.params.id,
      name,
      description,
      price,
      stock,
      category
    });
  });
});

// Delete a product
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(400).send(err.message);
    }
    res.sendStatus(200);
  });
});

module.exports = router;
