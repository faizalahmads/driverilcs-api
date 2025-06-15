const express = require('express');
const router = express.Router();
const db = require('../../db'); // pastikan ini mengarah ke koneksi database

router.post('/', (req, res) => {
  const { id, status } = req.body;

  if (!status) {
    return res.status(400).send('Kolom Isian Tidak Boleh Kosong');
  }

  if (!id) {
    // Insert jika ID tidak disediakan
    const insertQuery = 'INSERT INTO kendaraan (status) VALUES (?)';
    db.query(insertQuery, [status], (err, result) => {
      if (err) {
        console.error('Gagal menyimpan data:', err);
        return res.status(500).send('Error Simpan Data');
      }
      res.send('Data Berhasil Disimpan');
    });
  } else {
    // Update jika ID ada (CATATAN: update ini update SEMUA baris karena tidak ada WHERE id)
    const updateQuery = 'UPDATE kendaraan SET status = ? WHERE id = ?';
    db.query(updateQuery, [status, id], (err, result) => {
      if (err) {
        console.error('Gagal mengubah data:', err);
        return res.status(500).send('Error Ubah Data');
      }
      res.send('Data Berhasil Diubah');
    });
  }
});

module.exports = router;
