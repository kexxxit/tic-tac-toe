import { motion } from 'framer-motion';
import Cell from './Cell';

const Board = ({ board, onMove, currentPlayer, status }) => {
  const isGameOver = status === 'won' || status === 'draw';
  const isWaiting = status === 'waiting';
  const disabled = isGameOver || isWaiting;

  return (
    <div className="relative">
      {/* Decorative glow behind board */}
      <div 
        className="absolute -inset-4 rounded-2xl opacity-30 blur-xl transition-opacity duration-500"
        style={{
          background: currentPlayer === 'X' 
            ? 'radial-gradient(circle, rgba(0, 229, 255, 0.4), transparent)'
            : currentPlayer === 'O'
            ? 'radial-gradient(circle, rgba(255, 36, 228, 0.4), transparent)'
            : 'transparent',
          opacity: isGameOver ? 0 : 0.3,
        }}
      />

      {/* Main board container */}
      <motion.div 
        className="relative bg-surface-container/60 backdrop-blur-xl rounded-2xl p-4 shadow-glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Turn indicator header */}
        <div className="flex items-center justify-between mb-4 px-2">
          <motion.div 
            className={`flex items-center gap-2 ${currentPlayer === 'X' ? 'opacity-100' : 'opacity-50'}`}
            animate={{ scale: currentPlayer === 'X' ? 1.05 : 1 }}
          >
            <span 
              className="text-xl font-headline font-bold"
              style={{ color: '#c3f5ff', textShadow: currentPlayer === 'X' ? '0 0 10px #00e5ff' : 'none' }}
            >
              X
            </span>
            <span className="text-sm text-on-surface-variant">Player 1</span>
          </motion.div>
          
          <span className="text-on-surface-variant">vs</span>
          
          <motion.div 
            className={`flex items-center gap-2 ${currentPlayer === 'O' ? 'opacity-100' : 'opacity-50'}`}
            animate={{ scale: currentPlayer === 'O' ? 1.05 : 1 }}
          >
            <span 
              className="text-xl font-headline font-bold"
              style={{ color: '#fface8', textShadow: currentPlayer === 'O' ? '0 0 10px #ff24e4' : 'none' }}
            >
              O
            </span>
            <span className="text-sm text-on-surface-variant">Player 2</span>
          </motion.div>
        </div>

        {/* 3x3 Grid with ghost borders */}
        <div className="grid grid-cols-3 gap-2">
          {board.map((cell, index) => (
            <Cell
              key={index}
              value={cell}
              onClick={() => !disabled && onMove(index)}
              disabled={disabled || cell !== null}
            />
          ))}
        </div>

        {/* Status indicator */}
        {isGameOver && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-3 rounded-lg bg-surface-container-high/80 text-center"
          >
            <span className="text-on-surface font-label">
              {status === 'won' ? `Player ${currentPlayer} wins!` : "It's a draw!"}
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Board;
