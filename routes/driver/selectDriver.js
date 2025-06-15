const express = require('express');
const router = express.Router();
const db = require('../../db'); // pastikan file db.js sudah dikonfigurasi

// Endpoint untuk mengambil semua data dari tabel kendaraan
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM kendaraan';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).send('Terjadi kesalahan saat mengambil data');
    }

    res.json(results);
  });
});

module.exports = router;
