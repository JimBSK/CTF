import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_WS_URL || 'http://localhost:3000', {
  autoConnect: false,
  withCredentials: true
});

export const connectSocket = (token) => {
  socket.auth = { token };
  socket.connect();
};

export const joinRoom = (roomId) => {
  socket.emit('joinRoom', roomId);
};

export const sendMessage = (roomId, message) => {
  socket.emit('sendMessage', { roomId, message });
};

export const subscribeToMessages = (callback) => {
  socket.on('newMessage', callback);
};

export default socket;