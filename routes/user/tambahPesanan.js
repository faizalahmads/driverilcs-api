const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
  const { nama, titik_awal, titik_akhir, jam, jumlah_penumpang } = req.body;

  if (!nama || !titik_awal || !titik_akhir || !jam || !jumlah_penumpang) {
    return res.status(400).send('Semua kolom wajib diisi');
  }

  const sql = `
    INSERT INTO pesanan (nama, titik_awal, titik_akhir, jam, jumlah_penumpang)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [nama, titik_awal, titik_akhir, jam, jumlah_penumpang], (err, result) => {
    if (err) {
      console.error('Gagal tambah pesanan:', err);
      return res.status(500).send('Gagal menambah pesanan');
    }

    res.send('Tambah Pesanan Berhasil');
  });
});

module.exports = router;
