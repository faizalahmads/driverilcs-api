const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'driverilcs'
});

db.connect(err => {
  if (err) {
    console.error('Gagal koneksi ke database:', err);
    process.exit(1);
  }
  console.log('Terhubung ke database');
});

module.exports = db;
