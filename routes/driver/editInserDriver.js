const express = require('express');
const router = express.Router();
const db = require('../../db');

// Endpoint untuk insert/update data kendaraan
router.post('/', (req, res) => {
  const { id, nama_driver, nomor_plat, jadwal_service } = req.body;

  if (!nama_driver || !nomor_plat || !jadwal_service) {
    return res.send('Kolom Isian Tidak Boleh Kosong');
  }

  if (!id) {
    // INSERT
    const insertSql = `
      INSERT INTO kendaraan (nama_driver, nomor_plat, jadwal_service)
      VALUES (?, ?, ?)
    `;
    db.query(insertSql, [nama_driver, nomor_plat, jadwal_service], (err, result) => {
      if (err) {
        console.error(err);
        return res.send('Error Simpan Data: ' + err.message);
      }
      res.send('Data Berhasil Disimpan');
    });
  } else {
    // UPDATE
    const updateSql = `
      UPDATE kendaraan
      SET nama_driver = ?, nomor_plat = ?, jadwal_service = ?
      WHERE id = ?
    `;
    db.query(updateSql, [nama_driver, nomor_plat, jadwal_service, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.send('Error Ubah Data: ' + err.message);
      }
      res.send('Data Berhasil Diubah');
    });
  }
});

module.exports = router;
