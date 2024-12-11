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

