/*
 * Require
 */
const express = require('express');
const multer = require ('multer') 
const Server = require('http').Server;
const socket = require('socket.io');
require('dotenv').config();
const router = require('./app/router');

const app = express();

const server = Server(app);
const io = socket(server);

const PORT = process.env.PORT || 3000;

const bodyParser = multer();
app.use(bodyParser.none());

app.use(express.static('assets'));

/*
 * Socket.io
 */
//send
io.on('connection', (socket) => {
  socket.on('send_message', (message) => {
      io.emit('send_message', message);
  });
  socket.on('data', (message) => {
    io.emit('data', message);
  });
});

/*
 * To access an api
 */
app.use('/api', router);

/*
 * Server
 */
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});