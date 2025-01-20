const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`A user connected ${socket.id}`);

  socket.on('user joined', (username) => {
    socket.username = username;
    socket.broadcast.emit('user joined', username); // Notify other users
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      socket.broadcast.emit('user left', socket.username); // Notify other users
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
