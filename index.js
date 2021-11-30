/*
 * Require
 */
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const router = require('./app/router');

const app = express();

app.use(express.static('assets'));

/*
 * To access an api
 */
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});