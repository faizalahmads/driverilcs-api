const express = require('express');
const router = express.Router();
const db = require('../../db'); // koneksi database dari file db.js

// Endpoint untuk menghapus pesanan berdasarkan ID
router.post('/', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send('ID tidak boleh kosong');
  }

  const sql = 'DELETE FROM pesanan WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Gagal menghapus data:', err);
      return res.status(500).send('Gagal Menghapus Data');
    }

    if (result.affectedRows > 0) {
      res.send('Perjalanan Sudah Dilakukan');
    } else {
      res.send('Data dengan ID tersebut tidak ditemukan');
    }
  });
});

module.exports = router;
