# AGENTS.md

Multiplayer Tic-Tac-Toe game with real-time socket communication.

## Architecture

```
┌─────────────┐     WebSocket      ┌─────────────┐
│   Client    │◄──────────────────►│   Server    │
│  (React)    │                     │  (Node.js)  │
└─────────────┘                     └─────────────┘
     port 5173                           port 3001
```

## Project Structure

```
tic-tac-toe/
├── server/                 # Backend (Node.js + Express + Socket.io)
│   ├── src/
│   │   ├── index.js       # Server entry, socket event handlers
│   │   ├── roomManager.js # Room/player management, game logic
│   │   └── checkWinner.js # Win/draw detection algorithm
│   └── package.json
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.jsx        # Main component, state management
│   │   ├── socket.js      # Socket.io client wrapper
│   │   └── components/
│   │       ├── Board.jsx  # Game board with cells
│   │       ├── Cell.jsx   # Individual cell component
│   │       └── Lobby.jsx  # Room creation/joining UI
│   └── package.json
├── AGENTS.md              # This file
└── opencode.jsonc         # OpenCode configuration
```

## Current State

### ✅ Implemented Features

**Server (`server/src/`):**
- Room creation and management (unique 6-char IDs)
- Player joining with X/O assignment (host=X, guest=O)
- Move validation and game state updates
- Win/draw detection using checkWinner algorithm
- Multi-game support within same room (gameCount tracking)
- Player disconnect handling

**Client (`client/src/`):**
- Lobby: Create room / Join by ID
- Real-time board synchronization via Socket.io
- Turn-based gameplay with visual indicators
- Game over screen with winner/draw display
- "New Game" button to restart without leaving room
- Connection status indicator

### 📡 Socket Events

| Direction | Event | Payload |
|-----------|-------|--------|
| Client→Server | `create_room` | - |
| Server→Client | `room_created` | `{ roomId, status, gameCount }` |
| Client→Server | `join_room` | `roomId` |
| Server→Client | `room_joined` | `{ roomId, symbol, status }` |
| Client→Server | `make_move` | `{ roomId, index }` |
| Server→Client | `move_made` | `{ roomId, index, symbol, board, currentPlayer, status, winner/draw }` |
| Server→Client | `game_reset` | `{ roomId, board, currentPlayer, status, gameCount }` |
| Client→Server | `new_game` | `roomId` |
| Server→Client | `player_joined` | `{ roomId }` |
| Server→Client | `player_left` | `{ roomId }` |

### 🔧 Key Files Summary

**server/src/index.js**: Socket.io server with event handlers for all game actions

**server/src/roomManager.js**: RoomManager class managing rooms, players, moves; exports makeMove helper

**server/src/checkWinner.js**: Win detection - checks 8 winning combinations + draw condition

**client/src/socket.js**: Socket.io client wrapper with custom pub-sub system (useSocketStore)

**client/src/App.jsx**: Main component handling game state, socket subscriptions, UI rendering

### ⚠️ Known Issues / TODO

- [ ] No room persistence - rooms deleted when last player leaves
- [ ] No score tracking between games
- [ ] No spectator mode
- [ ] Missing error handling for edge cases
- [ ] No reconnection logic if socket disconnects mid-game

### 🚀 Quick Start

```bash
# Terminal 1 - Server
 cd server && npm install && npm run dev

# Terminal 2 - Client  
 cd client && npm install && npm run dev
```

Server runs on `http://localhost:3001`  
Client runs on `http://localhost:5173`

---
*Last updated: Sun Apr 12 2026*
