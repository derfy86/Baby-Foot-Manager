/*
 * Require
 */
const express = require('express');
require('dotenv').config();
const multer = require ('multer') 

const PORT = process.env.PORT || 3000;
const router = require('./app/router');

const app = express();

const bodyParser = multer();
app.use(bodyParser.none());

app.use(express.static('assets'));

/*
 * To access an api
 */
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});