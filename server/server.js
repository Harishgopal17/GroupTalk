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
    origin: 'https://joingrouptalk.netlify.app',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  // Listen for user joining a room
  socket.on('join room', ({ username, roomId }) => {
    socket.username = username;
    socket.roomId = roomId;

    // Join the user to the specified room
    socket.join(roomId);

    // Notify others in the room
    socket.to(roomId).emit('user joined', username);
  });

  // Handle chat messages
  socket.on('chat message', ({ roomId, msg }) => {
    // Broadcast the message to the room
    io.to(roomId).emit('chat message', msg);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    if (socket.roomId && socket.username) {
      socket.to(socket.roomId).emit('user left', socket.username);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
