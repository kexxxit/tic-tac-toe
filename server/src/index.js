// Tic-Tac-Toe Server
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { RoomManager } = require('./roomManager');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Create Room Manager instance
const roomManager = new RoomManager();

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Create a new room
  socket.on('create_room', () => {
    const roomId = roomManager.createRoom();
    roomManager.addPlayer(roomId, socket.id, 'X');
    
    socket.join(roomId);
    console.log(`Room created: ${roomId}, Player ${socket.id} is X`);
    
    const room = roomManager.getRoom(roomId);
    socket.emit('room_created', { roomId, status: room.status, gameCount: room.gameCount });
  });

  // Join an existing room
  socket.on('join_room', (roomId) => {
    const room = roomManager.joinRoom(roomId, socket.id);
    
    if (room) {
      socket.join(roomId);
      console.log(`Player ${socket.id} joined room ${roomId}`);
      
      // Get the symbol assigned to this player
      const symbol = roomManager.getPlayerSymbol(roomId, socket.id);
      
      socket.emit('room_joined', { roomId, symbol, status: room.status });
      
      // Notify other players in the room
      socket.to(roomId).emit('player_joined', { roomId });
      
      // If game is now ready to start (2 players), notify everyone
      if (room.status === 'playing') {
        io.to(roomId).emit('game_started', { roomId, board: room.board, gameCount: room.gameCount });
      }
    } else {
      socket.emit('join_failed', { message: 'Room not found or full' });
    }
  });

  // Make a move
  socket.on('make_move', ({ roomId, index }) => {
    const room = roomManager.getRoom(roomId);
    if (!room) {
      socket.emit('error', { message: 'Room not found' });
      return;
    }
    
    // Check if game has started (status must be 'playing')
    if (room.status === 'waiting') {
      socket.emit('error', { message: 'Waiting for second player to join' });
      return;
    }
    
    // Check if this player is in the room
    if (!roomManager.isPlayerInRoom(roomId, socket.id)) {
      socket.emit('error', { message: 'Not in this room' });
      return;
    }
    
    // Get player's symbol
    const symbol = roomManager.getPlayerSymbol(roomId, socket.id);
    
    // Check if it's this player's turn
    if (room.currentPlayer !== symbol) {
      socket.emit('error', { message: 'Not your turn' });
      return;
    }
    
    // Make the move using roomManager
    const result = roomManager.makeMove(roomId, index);
    
    if (!result.success) {
      socket.emit('error', { message: result.message });
      return;
    }
    
    // Broadcast updated game state to all players in the room
    io.to(roomId).emit('move_made', {
      roomId,
      index,
      symbol,
      board: room.board,
      currentPlayer: room.currentPlayer,
      status: result.gameOver ? (result.winner ? 'won' : 'draw') : 'playing',
      gameOver: result.gameOver,
      winner: result.winner || null,
      draw: result.draw || false
    });
  });

  // Start a new game in the same room
  socket.on('new_game', (roomId) => {
    const room = roomManager.resetRoom(roomId);
    if (room) {
      console.log(`Room ${roomId}: New game started, board:`, room.board);
      io.to(roomId).emit('game_reset', { 
        roomId, 
        board: [...room.board],
        currentPlayer: 'X',
        status: 'playing',
        gameCount: room.gameCount // Send game counter for React key
      });
    }
  });

  // Leave the game
  socket.on('leave_room', () => {
    const rooms = Array.from(roomManager.rooms.keys());
    for (const roomId of rooms) {
      if (roomManager.isPlayerInRoom(roomId, socket.id)) {
        roomManager.removePlayer(roomId, socket.id);
        io.to(roomId).emit('player_left', { roomId });
        break;
      }
    }
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    
    // Remove player from all rooms
    const rooms = Array.from(roomManager.rooms.keys());
    for (const roomId of rooms) {
      if (roomManager.isPlayerInRoom(roomId, socket.id)) {
        roomManager.removePlayer(roomId, socket.id);
        io.to(roomId).emit('player_left', { roomId });
      }
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Tic-Tac-Toe server running on port ${PORT}`);
});
