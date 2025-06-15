const express = require('express');
const router = express.Router();
const db = require('../../db');
const bcrypt = require('bcrypt');

// Simpan atau update user
router.post('/', async (req, res) => {
  const { id, nama, divisi, nip, password } = req.body;

  // Validasi input
  if (!nama || !divisi || !nip) {
    return res.send('Kolom Isian Tidak Boleh Kosong');
  }

  try {
    const hashedPassword = await bcrypt.hash(password || '', 10);

    if (!id) {
      // INSERT
      const insertSql = `INSERT INTO users (nama, divisi, nip, password) VALUES (?, ?, ?, ?)`;
      db.query(insertSql, [nama, divisi, nip, hashedPassword], (err, result) => {
        if (err) {
          console.error(err);
          return res.send('Error Simpan Data: ' + err.message);
        }
        res.send('Data Berhasil Disimpan');
      });
    } else {
      // UPDATE
      const updateSql = `UPDATE users SET nama = ?, divisi = ?, nip = ?, password = ? WHERE id = ?`;
      db.query(updateSql, [nama, divisi, nip, hashedPassword, id], (err, result) => {
        if (err) {
          console.error(err);
          return res.send('Error Ubah Data: ' + err.message);
        }
        res.send('Data Berhasil Diubah');
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan saat memproses data');
  }
});

module.exports = router;
