// Room Manager - manages game rooms and players
const { checkWinner } = require('./checkWinner');

function makeMove(room, index) {
  // Check if cell is empty
  if (room.board[index] !== null) {
    return { success: false, message: 'Cell already occupied' };
  }
  
  // Make the move using current player from room
  room.board[index] = room.currentPlayer;
  
  // Check for winner or draw
  const result = checkWinner(room.board);
  
  if (result.winner) {
    room.status = 'won';
    room.winner = result.winner;
    return { success: true, gameOver: true, winner: result.winner };
  }
  
  // Check for draw
  if (!room.board.includes(null)) {
    room.status = 'draw';
    return { success: true, gameOver: true, draw: true };
  }
  
  // Switch player
  room.currentPlayer = (room.currentPlayer === 'X') ? 'O' : 'X';
  
  return { success: true, gameOver: false, currentPlayer: room.currentPlayer };
}

function resetGame(room) {
  room.board.fill(null);
  room.currentPlayer = 'X';
  room.status = 'playing';
  room.winner = null;
  room.gameCount++; // Increment game counter for new game
  return room;
}

class RoomManager {
  constructor() {
    this.rooms = new Map(); // roomId -> roomData
  }

  generateRoomId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  createRoom() {
    const roomId = this.generateRoomId();
    const room = {
      roomId,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      status: 'waiting', // waiting, playing, won, draw
      winner: null,
      gameCount: 1, // Game counter starting at 1
      players: [] // { socketId, symbol }
    };
    this.rooms.set(roomId, room);
    console.log(`Room created: ${roomId}`);
    return roomId;
  }

  addPlayer(roomId, socketId, symbol) {
    const room = this.rooms.get(roomId);
    if (!room) return false;
    
    // Check if room is full (max 2 players)
    if (room.players.length >= 2) return false;
    
    room.players.push({ socketId, symbol });
    console.log(`Player ${socketId} added to room ${roomId} as ${symbol}`);
    return true;
  }

  joinRoom(roomId, socketId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;
    
    // Check if room is full
    if (room.players.length >= 2) {
      console.log(`Room ${roomId} is full`);
      return null;
    }
    
    // First player (host) gets X, second player gets O
    const symbol = room.players.length === 0 ? 'X' : 'O';
    this.addPlayer(roomId, socketId, symbol);
    
    // If 2 players are present, start the game
    if (room.players.length === 2) {
      room.status = 'playing';
      room.currentPlayer = 'X'; // X always goes first
      console.log(`Room ${roomId}: Game started!`);
    }
    
    return room;
  }

  removePlayer(roomId, socketId) {
    const room = this.rooms.get(roomId);
    if (!room) return;
    
    room.players = room.players.filter(p => p.socketId !== socketId);
    
    // If no players left, delete the room
    if (room.players.length === 0) {
      this.rooms.delete(roomId);
      console.log(`Room ${roomId} deleted - no players`);
    }
  }

  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  getPlayerSymbol(roomId, socketId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;
    
    const player = room.players.find(p => p.socketId === socketId);
    return player ? player.symbol : null;
  }

  isPlayerInRoom(roomId, socketId) {
    const room = this.rooms.get(roomId);
    if (!room) return false;
    return room.players.some(p => p.socketId === socketId);
  }

  makeMove(roomId, index) {
    const room = this.rooms.get(roomId);
    if (!room) return { success: false, message: 'Room not found' };
    
    // Check if game is still playing
    if (room.status !== 'playing') {
      return { success: false, message: 'Game already over' };
    }
    
    // Check if there are 2 players in the room
    if (room.players.length < 2) {
      return { success: false, message: 'Waiting for second player' };
    }
    
    const result = makeMove(room, index);
    return result;
  }

  resetRoom(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;
    
    resetGame(room);
    return room;
  }
}

module.exports = {
  RoomManager,
  makeMove,
  resetGame
};
