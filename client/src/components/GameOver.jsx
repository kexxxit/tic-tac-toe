import { motion } from 'framer-motion';

const GameOver = ({ status, roomId, mySymbol, isHost, onNewGame, onLeaveRoom }) => {
  // Handle different statuses: 'won', 'draw', 'waiting'
  const isWaiting = status === 'waiting';
  const isDraw = status === 'draw';
  const winner = status === 'won' ? mySymbol : null;
  const isXWinner = winner === 'X';
  const isOWinner = winner === 'O';

  // Winner glow color
  const glowColor = isXWinner ? '#00e5ff' : isOWinner ? '#ff24e4' : 'transparent';
  const accentColor = isXWinner ? '#c3f5ff' : isOWinner ? '#fface8' : '#bac9cc';

  // Render waiting screen differently
  if (isWaiting) {
    return (
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm" />

        {/* Pulsing wave animation */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full"
              style={{
                background: mySymbol === 'X' ? '#00e5ff20' : '#ff24e420',
              }}
              initial={{ scale: 1, opacity: 0 }}
              animate={{ 
                scale: [1, 1.5],
                opacity: [0, 0.3, 0],
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.5,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        {/* Main modal */}
        <motion.div
          className="relative z-10 w-full max-w-md"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
        >
          <div className="relative bg-surface-container/80 backdrop-blur-xl rounded-2xl p-8 shadow-glass-tinted">
            {/* Waiting icon */}
            <motion.div 
              className="relative text-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <span className="text-8xl">⏳</span>
            </motion.div>

            {/* Result text */}
            <h2 className="text-3xl font-headline font-bold text-center mb-2">
              <span className="text-on-surface">Waiting for Opponent...</span>
            </h2>

            <p className="text-on-surface-variant text-center mb-8">
              Share room ID with your opponent to start the game
            </p>

            {/* Room ID display */}
            {isHost && (
              <motion.div 
                className="mb-6 p-4 rounded-xl bg-primary-container/20 border border-primary-container/50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant text-sm">Room ID:</span>
                  <motion.span 
                    className="text-2xl font-headline font-bold tracking-wider"
                    style={{ color: '#c3f5ff', textShadow: '0 0 10px rgba(0, 229, 255, 0.5)' }}
                  >
                    {roomId}
                  </motion.span>
                </div>
              </motion.div>
            )}

            {/* Your symbol */}
            <p className="text-on-surface-variant text-center mb-8">
              You are: <span className={`font-bold ${mySymbol === 'X' ? 'text-[#c3f5ff]' : 'text-[#fface8]'}`}>{mySymbol}</span>
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={onLeaveRoom}
                className="w-full px-6 py-4 rounded-xl font-label font-bold text-lg bg-surface-container-high hover:bg-surface-bright transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-on-surface">Leave Room</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop with ambient glow */}
      <div 
        className="absolute inset-0 bg-surface/80 backdrop-blur-sm"
        style={{
          background: isDraw
            ? 'radial-gradient(circle at center, rgba(132, 147, 150, 0.1), #10131a)'
            : `radial-gradient(circle at center, ${glowColor}40, #10131a)`,
        }}
      />

      {/* Animated background particles for winner */}
      {!isDraw && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: accentColor,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: Math.random() * 200 - 100,
              }}
              transition={{ 
                duration: 2 + Math.random(), 
                delay: Math.random() * 0.5,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      )}

      {/* Main modal */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
      >
        <div className="relative bg-surface-container/80 backdrop-blur-xl rounded-2xl p-8 shadow-glass-tinted">
          {/* Decorative gradient border */}
          {!isDraw && (
            <motion.div 
              className="absolute -inset-1 rounded-2xl opacity-40 blur-sm"
              style={{ background: glowColor }}
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          {/* Winner icon or draw symbol */}
          <motion.div 
            className="relative text-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            {isDraw ? (
              <span className="text-8xl">🤝</span>
            ) : (
              <motion.span 
                className="text-9xl font-headline font-bold"
                style={{ color: accentColor, textShadow: `0 0 30px ${glowColor}` }}
                animate={status === 'won' ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0],
                } : {}}
                transition={{ duration: 0.8 }}
              >
                {winner}
              </motion.span>
            )}
          </motion.div>

          {/* Result text */}
          <h2 className="text-3xl font-headline font-bold text-center mb-2">
            {isDraw ? (
              <span className="text-on-surface">It's a Draw!</span>
            ) : (
              <motion.span 
                className="block"
                style={{ color: accentColor, textShadow: `0 0 20px ${glowColor}` }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Player {winner} Wins!
              </motion.span>
            )}
          </h2>

          <p className="text-on-surface-variant text-center mb-8">
            {isDraw 
              ? 'Great play from both sides!'
              : `Congratulations to Player ${winner}!`}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              onClick={onNewGame}
              className="flex-1 px-6 py-4 rounded-xl font-label font-bold text-lg transition-all"
              style={{
                background: isXWinner 
                  ? 'linear-gradient(135deg, #00e5ff, #c3f5ff)'
                  : isOWinner
                  ? 'linear-gradient(135deg, #ff24e4, #fface8)'
                  : 'linear-gradient(135deg, #d9c8ff, #f2e9ff)',
              }}
              whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${glowColor}` }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-surface">New Game</span>
            </motion.button>

            <motion.button
              onClick={onLeaveRoom}
              className="px-6 py-4 rounded-xl font-label font-bold text-lg bg-surface-container-high hover:bg-surface-bright transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-on-surface">Leave Room</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameOver;
