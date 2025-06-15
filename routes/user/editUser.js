const express = require('express');
const router = express.Router();
const db = require('../../db');

// Endpoint untuk update user
router.post('/', (req, res) => {
  const { id, nama, divisi, nip, password } = req.body;

  if (!id || !nama || !divisi || !nip) {
    return res.status(400).send('Data tidak lengkap');
  }

  const sql = 'UPDATE users SET nama = ?, divisi = ?, nip = ?' + (password ? ', password = ?' : '') + ' WHERE id = ?';
  const params = password
    ? [nama, divisi, nip, password, id]
    : [nama, divisi, nip, id];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error('Gagal update user:', err);
      return res.status(500).send('Gagal update user');
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('User tidak ditemukan');
    }

    res.send('User berhasil diupdate');
  });
});

module.exports = router;
