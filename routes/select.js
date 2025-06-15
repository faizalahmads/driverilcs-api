const express = require('express');
const router = express.Router();
const db = require('../db');

// Endpoint untuk mengambil semua data dari tabel users
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM users';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).send('Terjadi kesalahan saat mengambil data');
    }

    res.json(results); // Kirim data dalam format JSON
  });
});

module.exports = router;
