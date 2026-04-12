// Socket.io client configuration
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

export const socket = io(SOCKET_URL, {
  transports: ['websocket'],
});

// Connection state management
export const useSocketStore = () => {
  let subscribers = [];
  
  const subscribe = (callback) => {
    subscribers.push(callback);
    return () => {
      subscribers = subscribers.filter(s => s !== callback);
    };
  };

  socket.on('connect', () => {
    console.log('Connected to server');
    notifySubscribers({ connected: true });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
    notifySubscribers({ connected: false });
  });

  // Game events
  socket.on('room_created', (data) => {
    notifySubscribers({ type: 'room_created', data });
  });

  socket.on('room_joined', (data) => {
    notifySubscribers({ type: 'room_joined', data });
  });

  socket.on('game_state', (data) => {
    notifySubscribers({ type: 'game_state', data });
  });

  socket.on('move_made', (data) => {
    notifySubscribers({ type: 'move_made', data });
  });

  socket.on('player_joined', (data) => {
    notifySubscribers({ type: 'player_joined', data });
  });

  socket.on('player_left', () => {
    notifySubscribers({ type: 'player_left' });
  });

  // New game event - sent when someone starts a new game in the room
  socket.on('game_reset', (data) => {
    console.log('[socket.js] game_reset received:', data);
    notifySubscribers({ type: 'game_reset', data });
  });

  const notifySubscribers = (event) => {
    subscribers.forEach(callback => callback(event));
  };

  return { subscribe };
};

export default socket;
