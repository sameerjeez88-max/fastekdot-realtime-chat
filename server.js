/**
 * @project FastekDot Real-Time Chat & Collaboration App
 * @author Rana Yasir Mahy Ud Din
 * @website https://ranayasir.unaux.com/
 * @company FastekDot (https://www.fastekdot.com)
 * @github https://github.com/Sameerjeez88-max
 * @copyright 2026 Rana Yasir Mahy Ud Din. All Rights Reserved.
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// API Health & Developer Info Endpoint
app.get('/api/info', (req, res) => {
  res.status(200).json({
    status: 'Active',
    application: 'FastekDot Real-Time Chat & Collaboration Engine',
    developer: 'Rana Yasir Mahy Ud Din',
    portfolio: 'https://ranayasir.unaux.com/',
    company: 'FastekDot (https://www.fastekdot.com)',
    github: 'https://github.com/Sameerjeez88-max'
  });
});

// Store connected users in memory
const users = new Map();

io.on('connection', (socket) => {
  // User joins a specific collaboration room
  socket.on('joinRoom', ({ username, room }) => {
    const user = { id: socket.id, username, room };
    users.set(socket.id, user);

    socket.join(room);

    // Welcome message to current user
    socket.emit('message', {
      username: 'FastekDot Bot',
      text: `Welcome to the #${room} collaboration room, ${username}!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSystem: true
    });

    // Notify others in the room
    socket.to(room).emit('message', {
      username: 'FastekDot Bot',
      text: `${username} has joined the room.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSystem: true
    });

    // Send updated active users list to the room
    const roomUsers = Array.from(users.values()).filter((u) => u.room === room);
    io.to(room).emit('roomUsers', { room, users: roomUsers });
  });

  // Listen for chat messages
  socket.on('chatMessage', (msg) => {
    const user = users.get(socket.id);
    if (user) {
      io.to(user.room).emit('message', {
        username: user.username,
        text: msg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        senderId: socket.id,
        isSystem: false
      });
    }
  });

  // Typing indicator broadcast
  socket.on('typing', (isTyping) => {
    const user = users.get(socket.id);
    if (user) {
      socket.to(user.room).emit('userTyping', {
        username: user.username,
        isTyping
      });
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      users.delete(socket.id);
      io.to(user.room).emit('message', {
        username: 'FastekDot Bot',
        text: `${user.username} has left the collaboration room.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSystem: true
      });

      const roomUsers = Array.from(users.values()).filter((u) => u.room === user.room);
      io.to(user.room).emit('roomUsers', { room: user.room, users: roomUsers });
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`FastekDot Real-Time Chat Server running on port ${PORT}`);
  console.log(`Developed by: Rana Yasir Mahy Ud Din`);
  console.log(`==================================================`);
});