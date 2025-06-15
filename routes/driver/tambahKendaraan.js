const express = require('express');
const router = express.Router();
const db = require('../../db');
const crypto = require('crypto');

router.post('/', (req, res) => {
  const { nip, nama_driver, nomor_plat, merk, jadwal_service, password, role } = req.body;

  if (!nip || !nama_driver || !nomor_plat || !merk || !jadwal_service || !password || !role) {
    return res.status(400).send('Semua kolom wajib diisi');
  }

  // Cek apakah NIP sudah digunakan
  const checkQuery = 'SELECT * FROM kendaraan WHERE nip = ?';
  db.query(checkQuery, [nip], (err, result) => {
    if (err) {
      console.error('Error saat cek NIP:', err);
      return res.status(500).send('Terjadi kesalahan saat mengecek NIP');
    }

    if (result.length > 0) {
      return res.send('NIP sudah digunakan');
    }

    // Jika NIP belum digunakan, lakukan insert
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    const insertQuery = `
      INSERT INTO kendaraan (nama_driver, nomor_plat, merk, jadwal_service, nip, password, role)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [nama_driver, nomor_plat, merk, jadwal_service, nip, hashedPassword, role],
      (err, result) => {
        if (err) {
          console.error('Gagal tambah kendaraan:', err);
          return res.status(500).send('Gagal menambah kendaraan');
        }

        res.send('Tambah Kendaraan berhasil');
      }
    );
  });
});

module.exports = router;
