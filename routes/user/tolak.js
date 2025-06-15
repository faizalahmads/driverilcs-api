const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send('ID tidak ditemukan');
  }

  const query = 'DELETE FROM pesanan WHERE id = ?';

  db.query(query, [id], (err, result) => {
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
