const express = require('express');
const router = express.Router();
const db = require('../../db');

// Endpoint hapus user berdasarkan ID
router.post('/', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send('ID tidak ditemukan');
  }

  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Gagal Menghapus Data:', err);
      return res.status(500).send('Gagal Menghapus Data');
    }

    if (result.affectedRows > 0) {
      res.send('Data Berhasil Dihapus');
    } else {
      res.send('Data dengan ID tersebut tidak ditemukan');
    }
  });
});

module.exports = router;
