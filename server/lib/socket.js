const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
  socket.console.log('a user connected');
});

module.exports = { io, app, server };
