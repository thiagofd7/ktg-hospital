// server/socket.js
import { Server } from 'socket.io';

const initializeSocket = (server) => {
  if (!server.io) {
    console.log('Initializing socket.io server');
    const io = new Server(server);

    io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });

      socket.on('statusUpdate', (data) => {
        console.log('Received status update:', data);
        io.emit('statusUpdate', data); // Broadcast status updates to all clients
      });
    });

    server.io = io;
  } else {
    console.log('Socket.io server already initialized');
  }
};

export default initializeSocket;
