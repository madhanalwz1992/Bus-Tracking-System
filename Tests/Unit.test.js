const sqlite3 = require('sqlite3').verbose();

let db;

beforeAll(() => {
  db = new sqlite3.Database(':memory:'); // In-memory database for testing
  db.run(`
    CREATE TABLE IF NOT EXISTS buses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bus_number TEXT NOT NULL,
      capacity INTEGER NOT NULL,
      current_location TEXT NOT NULL
    )
  `);
});

afterAll(() => {
  db.close();
});