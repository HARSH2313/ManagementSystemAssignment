const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'management_system1'
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    throw err;
  }
  console.log('MySQL connected...');
});

module.exports = db;
