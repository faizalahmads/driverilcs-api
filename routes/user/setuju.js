const express = require('express');
const router = express.Router();
const db = require('../../db'); // Pastikan file db.js mengatur koneksi database

// Endpoint untuk menyetujui pesanan dengan menambahkan nama_driver
router.post('/', (req, res) => {
  const { id, nama_driver } = req.body;

  if (!id || !nama_driver) {
    return res.status(400).send('ID atau nama_driver tidak diterima');
  }

  const sql = 'UPDATE pesanan SET nama_driver = ? WHERE id = ?';
  db.query(sql, [nama_driver, id], (err, result) => {
    if (err) {
      console.error('Error saat update:', err);
      return res.status(500).send('Terjadi kesalahan saat menyimpan data');
    }

    if (result.affectedRows > 0) {
      res.send('Driver Berhasil Ditambah');
    } else {
      res.send('Data dengan ID tersebut tidak ditemukan');
    }
  });
});

module.exports = router;
