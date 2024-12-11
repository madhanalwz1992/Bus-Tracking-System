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
  app.delete('/buses/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM buses WHERE id = ?';
    db.run(query, [id], function (err) {
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: 'Bus deleted successfully' });
    });
  });

  // Integration Tests
describe('Bus API Integration Tests', () => {
    test('POST /buses - should add a bus', async () => {
      const response = await request(app)
        .post('/buses')
        .send({ bus_number: 'BUS101', capacity: 50, current_location: 'Depot A' });
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Bus added successfully');
    });
    
    test('GET /buses - should fetch all buses', async () => {
        const response = await request(app).get('/buses');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
      });