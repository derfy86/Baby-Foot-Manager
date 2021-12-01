const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController.js');

router.get('/', mainController.homePage);

router.post('/add', mainController.addPlay);

router.delete('/delete/:id', mainController.deletePlay);

module.exports = router;