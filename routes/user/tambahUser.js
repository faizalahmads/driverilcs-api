const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../db');

router.post('/', async (req, res) => {
  const { nama, divisi, nip, password, role } = req.body;

  if (!nama || !divisi || !nip || !password || !role) {
    return res.status(400).send('Semua kolom wajib diisi');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (nama, divisi, nip, password, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [nama, divisi, nip, hashedPassword, role], (err, result) => {
      if (err) {
        console.error('Gagal tambah user:', err);
        return res.status(500).send('Terjadi kesalahan saat menyimpan data');
      }

      res.send('Registrasi berhasil');
    });

  } catch (error) {
    console.error('Hashing error:', error);
    res.status(500).send('Gagal mengenkripsi password');
  }
});

module.exports = router;
