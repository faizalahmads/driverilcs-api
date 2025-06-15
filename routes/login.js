const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db'); // koneksi MySQL
const session = require('express-session'); // optional jika belum digunakan di server.js

router.post('/', (req, res) => {
  const { nip, password } = req.body;

  const sql = 'SELECT * FROM users WHERE nip = ?';
  db.query(sql, [nip], async (err, results) => {
    if (err) return res.status(500).send('Terjadi kesalahan server');

    if (results.length > 0) {
      const user = results[0];

      const match = await bcrypt.compare(password, user.password);
      if (match) {
        req.session.nip = user.nip;
        req.session.nama = user.nama;
        req.session.divisi = user.divisi;
        req.session.role = user.role;

        res.send(`Login berhasil|${user.role}`);
      } else {
        res.send('Login gagal');
      }
    } else {
      res.send('Login gagal');
    }
  });
});

module.exports = router;
