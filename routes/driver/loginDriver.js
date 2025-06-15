const express = require('express');
const router = express.Router();
const db = require('../../db');
const bcrypt = require('bcrypt');

// Endpoint untuk login driver
router.post('/', async (req, res) => {
  const { nip, password } = req.body;

  // Ambil user berdasarkan nip
  const sql = 'SELECT * FROM kendaraan WHERE nip = ?';
  db.query(sql, [nip], async (err, results) => {
    if (err) return res.status(500).send('Terjadi kesalahan server');

    if (results.length > 0) {
      const driver = results[0];

      // Cocokkan password yang dimasukkan dengan hash di DB
      const match = await bcrypt.compare(password, driver.password);

      if (match) {
        res.send('Login berhasil');
      } else {
        res.send('Login gagal');
      }
    } else {
      res.send('Login gagal');
    }
  });
});

module.exports = router;
