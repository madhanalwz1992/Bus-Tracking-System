const request = require('supertest');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

// Set up the app and in-memory database for testing
const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS buses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bus_number TEXT NOT NULL,
      capacity INTEGER NOT NULL,
      current_location TEXT NOT NULL
    )
  `);
});
// Routes
app.post('/buses', (req, res) => {
    const { bus_number, capacity, current_location } = req.body;
    const query = 'INSERT INTO buses (bus_number, capacity, current_location) VALUES (?, ?, ?)';
    db.run(query, [bus_number, capacity, current_location], function (err) {
      if (err) return res.status(500).send(err);
      res.status(201).send({ message: 'Bus added successfully', id: this.lastID });
    });
  });
  app.get('/buses', (req, res) => {
    const query = 'SELECT * FROM buses';
    db.all(query, (err, rows) => {
      if (err) return res.status(500).send(err);
      res.status(200).json(rows);
    });
  });