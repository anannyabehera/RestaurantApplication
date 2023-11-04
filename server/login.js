const { Router } = require('express');
const db = require('./model');
const util = require('util');
const router = Router();

router.post('/register', (req, res) => {
  const { name, mob } = req.body;

  // Insert user data into the database
  db.query('INSERT INTO users(name, mob) VALUES($1, $2)', [name, mob], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'An error occurred while registering.' }); // Send an error message
    } else {
      console.log('User registered successfully');
      res.status(201).json({ message: 'User registered successfully' });
    }
  });
});
router.post('/login', (req, res) => {
  const { name, mob } = req.body;
console.log('server--', req.body);
  // Execute a query to check if the user with the provided name and mob exists in the database
  db.query('SELECT id, name, mob FROM users WHERE name = $1', [name], (err, result) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'An error occurred while logging in.' }); // Send an error message
    } else {
      if (result.rows.length === 1 && result.rows[0].mob === mob) {
        console.log('Login successful');
        res.status(200).json({ message: 'Login successful' });
      } else {
        console.log('Login failed');
        res.status(401).json({ error: 'Login failed' });
      }
    }
  });
});

module.exports = router;
