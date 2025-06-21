const { Server } = require('socket.io');
const { createServer } = require('http');
const express = require('express');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    credentials: true
  }
});

// Подключение админ-панели
const { instrument } = require("@socket.io/admin-ui");
instrument(io, {
  auth: false,
  mode: "development"
});

// Обработчики событий
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on('sendMessage', ({ roomId, message }) => {
    io.to(roomId).emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

module.exports = { httpServer, io };