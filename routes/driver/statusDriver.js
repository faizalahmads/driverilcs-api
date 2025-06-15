const express = require('express');
const router = express.Router();
const db = require('../../db'); // pastikan path benar sesuai struktur project kamu

// Endpoint untuk update status driver
router.post('/', (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).send('ID atau status tidak diterima');
  }

  const sql = 'UPDATE kendaraan SET status = ? WHERE id = ?';
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error('Error saat update:', err);
      return res.status(500).send('Terjadi kesalahan saat memperbarui status');
    }

    if (result.affectedRows > 0) {
      res.send('Status berhasil diperbarui');
    } else {
      res.send('Data dengan ID tersebut tidak ditemukan');
    }
  });
});

module.exports = router;
