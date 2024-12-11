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

describe('Bus CRUD Operations', () => {
    test('should insert a bus into the database', (done) => {
      const query = 'INSERT INTO buses (bus_number, capacity, current_location) VALUES (?, ?, ?)';
      db.run(query, ['BUS001', 40, 'Station A'], function (err) {
        expect(err).toBeNull();
        expect(this.lastID).toBeGreaterThan(0);
        done();
      });
    });
    test('should fetch all buses from the database', (done) => {
        db.all('SELECT * FROM buses', (err, rows) => {
          expect(err).toBeNull();
          expect(rows.length).toBeGreaterThan(0);
          done();
        });
      });
    