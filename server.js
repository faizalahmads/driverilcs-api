const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'rahasia-super',
  resave: false,
  saveUninitialized: true
}));

// Koneksi DB
const db = require('./db');

// Routes
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const logoutRoute = require('./routes/logout');
const selectRoute = require('./routes/select');
const pesananRoute = require('./routes/pesanan');

// Routes User
const deleteRoute = require('./routes/user/deleteUser');
const editUserRoute = require('./routes/user/editUser');
const editInsertRoute = require('./routes/user/editInsert');
const setujuRoute = require('./routes/user/setuju');
const tambahPesananRoute = require('./routes/user/tambahPesanan');
const tambahUserRoute = require('./routes/user/tambahUser');
const tolakRoute = require('./routes/user/tolak');

// Routes Driver
const loginDriverRoute = require('./routes/driver/loginDriver');
const deleteDriverRoute = require('./routes/driver/deleteDriver');
const editDriverRoute = require('./routes/driver/editDriver');
const editInsertDriverRoute = require('./routes/driver/editInserDriver');
const selectDriverRoute = require('./routes/driver/selectDriver');
const selesaiRoute = require('./routes/driver/selesai');
const statusDriverRoute = require('./routes/driver/statusDriver');
const updateStatusRoute = require('./routes/driver/updateStatus');
const tambahKendaraanRoute = require('./routes/driver/tambahKendaraan');

// Use Public
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/logout', logoutRoute);
app.use('/users', selectRoute);
app.use('/pesanan', pesananRoute);

// Use User
app.use('/deleteuser', deleteRoute);
app.use('/edituser', editUserRoute);
app.use('/editinsert', editInsertRoute);
app.use('/setuju', setujuRoute);
app.use('/tambahpesanan', tambahPesananRoute);
app.use('/tambahuser', tambahUserRoute);
app.use('/tolak', tolakRoute);

// Use Driver
app.use('/logindriver', loginDriverRoute);
app.use('/deletedriver', deleteDriverRoute);
app.use('/editdriver', editDriverRoute);
app.use('/editinsertdriver', editInsertDriverRoute);
app.use('/selectdriver', selectDriverRoute);
app.use('/selesai', selesaiRoute);
app.use('/statusdriver', statusDriverRoute);
app.use('/updatestatus', updateStatusRoute);
app.use('/tambahkendaraan', tambahKendaraanRoute);


app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
