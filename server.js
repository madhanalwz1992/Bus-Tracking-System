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

