const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

// Endpoint untuk registrasi user
router.post('/', async (req, res) => {
  const { nama, divisi, nip, password, role } = req.body;

  // Cek apakah NIP sudah terdaftar
  const checkSql = 'SELECT * FROM users WHERE nip = ?';
  db.query(checkSql, [nip], async (err, result) => {
    if (err) return res.status(500).send('Terjadi kesalahan server');

    if (result.length > 0) {
      return res.send('NIP sudah terdaftar');
    }

    // Hash password dengan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan ke database
    const insertSql = 'INSERT INTO users (nama, divisi, nip, password, role) VALUES (?, ?, ?, ?, ?)';
    db.query(insertSql, [nama, divisi, nip, hashedPassword, role], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Gagal menyimpan data');
      }

      res.send('Registrasi berhasil');
    });
  });
});

module.exports = router;
