const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// Endpoint logout user
router.post('/', async (req, res) => {
  const { nip, password } = req.body;

  if (!nip || !password) {
    return res.status(400).send('NIP dan password wajib diisi');
  }

  const sql = 'SELECT * FROM users WHERE nip = ?';
  db.query(sql, [nip], async (err, result) => {
    if (err) return res.status(500).send('Terjadi kesalahan server');

    if (result.length === 0) {
      return res.send('User tidak ditemukan');
    }

    const user = result[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.send('Password salah');
    }

    // Kosongkan password di database
    const updateSql = 'UPDATE users SET password = "" WHERE nip = ?';
    db.query(updateSql, [nip], (err2, updateResult) => {
      if (err2) return res.status(500).send('Logout gagal');

      res.send('success');
    });
  });
});

module.exports = router;
