// Main App Component
import { useState, useEffect } from 'react';
import socket, { useSocketStore } from './socket';
import RoomForm from './components/RoomForm';
import Board from './components/Board';
import './App.css';

const App = () => {
  // Game state
  const [gameState, setGameState] = useState({
    roomId: null,
    board: Array(9).fill(null),
    currentPlayer: 'X',
    status: 'waiting', // waiting, playing, won, draw
    winner: null,
    mySymbol: null,
    isHost: false,
    gameCount: 1 // Game counter for React key
  });

  const [isConnected, setIsConnected] = useState(false);
  const [showRoomForm, setShowRoomForm] = useState(true);

  // Socket subscription
  useEffect(() => {
    const unsubscribe = useSocketStore().subscribe((event) => {
      console.log('Socket event:', event);
      
      console.log("")

      switch (event.type) {
        case 'room_created':
          setGameState(prev => ({
            ...prev,
            roomId: event.data.roomId,
            mySymbol: 'X',
            isHost: true,
            status: event.data.status || 'waiting',
            board: event.data.board || Array(9).fill(null),
            currentPlayer: event.data.currentPlayer || 'X',
            gameCount: event.data.gameCount || 1
          }));
          setShowRoomForm(false);
          break;

        case 'room_joined':
          setGameState(prev => ({
            ...prev,
            roomId: event.data.roomId,
            mySymbol: event.data.symbol,
            isHost: false,
            status: event.data.status || 'waiting',
            board: event.data.board || Array(9).fill(null),
            currentPlayer: event.data.currentPlayer || 'X',
            gameCount: event.data.gameCount || 1
          }));
          setShowRoomForm(false);
          break;

        case 'room_joined':
          setGameState(prev => ({
            ...prev,
            roomId: event.data.roomId,
            mySymbol: event.data.symbol,
            status: event.data.status || 'waiting',
            gameCount: event.data.gameCount || 1
          }));
          setShowRoomForm(false);
          break;

        case 'game_started':
          setGameState(prev => ({
            ...prev,
            board: event.data.board,
            currentPlayer: event.data.currentPlayer,
            status: 'playing',
            gameCount: event.data.gameCount || prev.gameCount
          }));
          break;

        case 'game_state':
          setGameState(prev => ({
            ...prev,
            board: event.data.board,
            currentPlayer: event.data.currentPlayer,
            status: event.data.status,
            winner: event.data.winner
          }));
          break;

        case 'move_made':
          setGameState(prev => ({
            ...prev,
            board: event.data.board,
            currentPlayer: event.data.currentPlayer,
            status: event.data.status,
            winner: event.data.winner,
            gameCount: event.data.gameCount || prev.gameCount
          }));
          break;

        case 'player_joined':
          // Another player joined - update status to playing
          setGameState(prev => ({
            ...prev,
            status: event.data.status || 'playing',
            board: event.data.board || prev.board,
            currentPlayer: event.data.currentPlayer || 'X',
            gameCount: event.data.gameCount || prev.gameCount + 1
          }));
          break;

        case 'game_reset':
          // New game started - reset board but keep players in room
          console.log('[App] Game reset received:', event.data);
          setGameState(prev => {
            const newState = {
              ...prev,
              board: [...event.data.board], // Create new array reference
              currentPlayer: event.data.currentPlayer || 'X',
              status: event.data.status || 'playing',
              winner: null,
              gameCount: event.data.gameCount || prev.gameCount + 1
            };
            console.log('[App] Old state:', prev);
            console.log('[App] New state:', newState);
            return newState;
          });
          break;

        case 'player_left':
          // Reset to lobby when player leaves
          setGameState({
            roomId: null,
            board: Array(9).fill(null),
            currentPlayer: 'X',
            status: 'playing',
            winner: null,
            mySymbol: null,
            isHost: false,
            gameCount: 1
          });
          setShowRoomForm(true);
          break;

        default:
          break;
      }
    });

    return unsubscribe;
  }, []);

  // Connection state
  useEffect(() => {
    const unsubscribe = useSocketStore().subscribe((event) => {
      if (event.connected !== undefined) {
        setIsConnected(event.connected);
      }
    });
    return unsubscribe;
  }, []);

  // Create room
  const handleCreateRoom = () => {
    socket.emit('create_room');
  };

  // Join room
  const handleJoinRoom = (roomId) => {
    socket.emit('join_room', roomId.trim());
  };

  // Make move
  const handleMove = (index) => {
    // Can only make moves when game is actively playing
    if (!gameState.roomId || gameState.status !== 'playing') return;
    if (gameState.currentPlayer !== gameState.mySymbol) return;
    
    socket.emit('make_move', { roomId: gameState.roomId, index });
  };

  // New game
  const handleNewGame = () => {
    if (gameState.roomId) {
      socket.emit('new_game', gameState.roomId);
    }
  };

  // Leave room
  const handleLeaveRoom = () => {
    if (gameState.roomId) {
      socket.emit('leave_room');
    }
    setGameState({
      roomId: null,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      status: 'playing',
      winner: null,
      mySymbol: null,
      isHost: false,
      gameCount: 1
    });
    setShowRoomForm(true);
  };

  // Render lobby (room form)
  if (showRoomForm) {
    return (
      <div className="app">
        {!isConnected && <p>Connecting to server...</p>}
        {isConnected && (
          <RoomForm onCreate={handleCreateRoom} onJoin={handleJoinRoom} />
        )}
      </div>
    );
  }

  // Render waiting screen (game not started yet) - show board but disabled
  if (gameState.status === 'waiting') {
    return (
      <div className="app">
        <header className="game-header">
          <h1>Tic-Tac-Toe</h1>
          {gameState.roomId && (
            <p>Room: <span className="room-id">{gameState.roomId}</span></p>
          )}
        </header>

        <main className="game-content">
          <div className="waiting-screen">
            <h2>⏳ Waiting for opponent...</h2>
            <p>Share the room code with your friend to start the game</p>
            {gameState.isHost && (
              <p className="host-message">You are the host (X)</p>
            )}
          </div>
          
          {/* Show disabled board preview */}
          <Board
            board={gameState.board}
            onMove={() => {}}
            currentPlayer={'X'}
            mySymbol={gameState.mySymbol}
            status={'waiting'}
            winner={null}
          />
        </main>

        <footer className="game-footer">
          <button onClick={handleLeaveRoom} className="btn btn-secondary">Leave Room</button>
        </footer>
      </div>
    );
  }

  // Render game board
  return (
    <div className="app">
      <header className="game-header">
        <h1>Tic-Tac-Toe</h1>
        {gameState.roomId && (
          <p>Room: <span className="room-id">{gameState.roomId}</span></p>
        )}
      </header>

      <main className="game-content">
        <Board
          key={gameState.gameCount} // Use gameCount as key to force re-render on new game
          board={gameState.board} 
          onMove={handleMove}
          currentPlayer={gameState.currentPlayer}
          mySymbol={gameState.mySymbol}
          status={gameState.status}
          winner={gameState.winner}
        />

        {gameState.status === 'won' && (
          <div className="game-result">
            <h2>🎉 Player {gameState.winner} wins!</h2>
          </div>
        )}

        {gameState.status === 'draw' && (
          <div className="game-result">
            <h2>🤝 It's a draw!</h2>
          </div>
        )}

        {gameState.status === 'playing' && gameState.mySymbol && (
          <p className="turn-indicator">
            Current player: <span className={`symbol ${gameState.currentPlayer}`}>{gameState.currentPlayer}</span>
            {gameState.currentPlayer === gameState.mySymbol && " - Your turn!"}
          </p>
        )}
      </main>

      <footer className="game-footer">
        {(gameState.status === 'won' || gameState.status === 'draw') && (
          <button onClick={handleNewGame} className="btn btn-primary">New Game</button>
        )}
        {gameState.status !== 'waiting' && (
          <button onClick={handleLeaveRoom} className="btn btn-secondary">Leave Room</button>
        )}
      </footer>
    </div>
  );
};

export default App;
