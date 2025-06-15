const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.send('Error Mengambil Data id Kosong');
  }

  const query = 'SELECT * FROM kendaraan WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Terjadi kesalahan saat mengambil data');
    }

    if (results.length > 0) {
      const row = results[0];
      const response = {
        id: row.id,
        nama_driver: row.nama_driver,
        nomor_plat: row.nomor_plat,
        jadwal_service: row.jadwal_service
      };
      res.json(response);
    } else {
      res.send('Error Mengambil Data');
    }
  });
});

module.exports = router;
