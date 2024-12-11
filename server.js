const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = new sqlite3.Database('./bus_system.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite:', err);
        process.exit(1);
    }
    console.log('Connected to SQLite database');
});
// Initialize the database
db.run(`
    CREATE TABLE IF NOT EXISTS buses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bus_number TEXT NOT NULL,
        capacity INTEGER NOT NULL,
        current_location TEXT NOT NULL
    )
`);

db.run(`
    CREATE TABLE IF NOT EXISTS routes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        route_name TEXT NOT NULL,
        start_location TEXT NOT NULL,
        end_location TEXT NOT NULL
    )
`);

db.run(`
    CREATE TABLE IF NOT EXISTS schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bus_id INTEGER NOT NULL,
        route_id INTEGER NOT NULL,
        departure_time TEXT NOT NULL,
        arrival_time TEXT NOT NULL,
        FOREIGN KEY (bus_id) REFERENCES buses(id),
        FOREIGN KEY (route_id) REFERENCES routes(id)
    )
`);
// Add a new bus
app.post('/buses', (req, res) => {
    const { bus_number, capacity, current_location } = req.body;
    const query = 'INSERT INTO buses (bus_number, capacity, current_location) VALUES (?, ?, ?)';
    db.run(query, [bus_number, capacity, current_location], function (err) {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'Bus added successfully', id: this.lastID });
    });
});
// Get all buses
app.get('/buses', (req, res) => {
    const query = 'SELECT * FROM buses';
    db.all(query, (err, rows) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(rows);
    });
});
// Update a bus
app.put('/buses/:id', (req, res) => {
    const { id } = req.params;
    const { bus_number, capacity, current_location } = req.body;
    const query = 'UPDATE buses SET bus_number = ?, capacity = ?, current_location = ? WHERE id = ?';
    db.run(query, [bus_number, capacity, current_location, id], function (err) {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Bus updated successfully' });
    });
});
// Delete a bus
app.delete('/buses/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM buses WHERE id = ?';
    db.run(query, [id], function (err) {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Bus deleted successfully' });
    });
});
// Add a new route
app.post('/routes', (req, res) => {
    const { route_name, start_location, end_location } = req.body;
    const query = 'INSERT INTO routes (route_name, start_location, end_location) VALUES (?, ?, ?)';
    db.run(query, [route_name, start_location, end_location], function (err) {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'Route added successfully', id: this.lastID });
    });
});
// Get all routes
app.get('/routes', (req, res) => {
    const query = 'SELECT * FROM routes';
    db.all(query, (err, rows) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(rows);
    });
});
// Update a route
app.put('/routes/:id', (req, res) => {
    const { id } = req.params;
    const { route_name, start_location, end_location } = req.body;
    const query = 'UPDATE routes SET route_name = ?, start_location = ?, end_location = ? WHERE id = ?';
    db.run(query, [route_name, start_location, end_location, id], function (err) {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Route updated successfully' });
    });
});
// Delete a route
app.delete('/routes/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM routes WHERE id = ?';
    db.run(query, [id], function (err) {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Route deleted successfully' });
    });
});
// Add a new schedule
app.post('/schedules', (req, res) => {
    const { bus_id, route_id, departure_time, arrival_time } = req.body;
    const query = 'INSERT INTO schedules (bus_id, route_id, departure_time, arrival_time) VALUES (?, ?, ?, ?)';
    db.run(query, [bus_id, route_id, departure_time, arrival_time], function (err) {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'Schedule added successfully', id: this.lastID });
    });
});
// Get all schedules
app.get('/schedules', (req, res) => {
    const query = `
        SELECT schedules.id, buses.bus_number, routes.route_name, schedules.departure_time, schedules.arrival_time
        FROM schedules
        INNER JOIN buses ON schedules.bus_id = buses.id
        INNER JOIN routes ON schedules.route_id = routes.id
    `;
    db.all(query, (err, rows) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(rows);
    });
});