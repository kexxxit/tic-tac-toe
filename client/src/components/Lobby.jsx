import { useState } from 'react';
import { motion } from 'framer-motion';

const Lobby = ({ onCreate, onJoin, isConnected, roomId: createdRoomId }) => {
  const [inputRoomId, setInputRoomId] = useState('');

  return (
    <motion.div 
      className="max-w-md mx-auto w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, type: 'spring' }}
    >
      {/* Glass card container */}
      <div className="relative bg-surface-container/70 backdrop-blur-xl rounded-2xl p-8 shadow-glass-tinted">
        {/* Decorative gradient border effect */}
        <div 
          className="absolute -inset-1 rounded-2xl opacity-30 blur-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.5), rgba(255, 36, 228, 0.5))',
          }}
        />

        {/* Connection Status */}
        {!isConnected && (
          <div className="mb-4 p-3 rounded-lg bg-error/10 border border-error/30 text-center">
            <span className="text-error text-sm">⚠️ Disconnected from server</span>
          </div>
        )}

        {/* Header */}
        <motion.div 
          className="relative text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 
            className="text-4xl font-headline font-bold mb-2"
            style={{
              background: 'linear-gradient(135deg, #c3f5ff, #fface8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Tic Tac Toe
          </h1>
          <p className="text-on-surface-variant text-sm">
            Multiplayer • Real-time • Competitive
          </p>
        </motion.div>

        {/* Action buttons */}
        <div className="space-y-4">
          {/* Create Room Button */}
          <motion.button
            onClick={onCreate}
            className="w-full relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-r from-primary-container to-primary opacity-90"
            />
            <motion.div
              className="relative px-6 py-4 rounded-xl flex items-center justify-center gap-3"
              style={{ background: 'linear-gradient(135deg, #00e5ff, #c3f5ff)' }}
            >
              <span className="text-surface font-bold text-lg">Create Room</span>
              <motion.span
                className="absolute right-4 opacity-0 group-hover:opacity-100"
                animate={{ x: [-2, 2, -2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.div>
          </motion.button>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t" style={{ borderColor: 'rgba(132, 147, 150, 0.3)' }} />
            <span className="px-4 text-on-surface-variant text-sm">OR</span>
            <div className="flex-grow border-t" style={{ borderColor: 'rgba(132, 147, 150, 0.3)' }} />
          </div>

          {/* Join Room Input & Button */}
          <motion.div 
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="text"
              value={inputRoomId}
              onChange={(e) => setInputRoomId(e.target.value.toUpperCase())}
              placeholder="Enter Room ID"
              maxLength={6}
              className="flex-grow px-4 py-3 rounded-xl bg-surface-container-high/60 border border-outline/30 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary-container transition-all font-label uppercase tracking-wider"
            />
            <motion.button
              onClick={() => onJoin(inputRoomId)}
              disabled={!inputRoomId.trim()}
              className="px-4 rounded-xl bg-secondary-container opacity-80 hover:opacity-100 disabled:opacity-30 disabled:hover:opacity-30 transition-all"
              style={{ background: 'linear-gradient(135deg, #ff24e4, #fface8)' }}
              whileHover={{ scale: inputRoomId.trim() ? 1.05 : 1 }}
              whileTap={{ scale: inputRoomId.trim() ? 0.95 : 1 }}
            >
              <span className="text-surface font-bold">Join</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Room ID display (shown after creation) */}
        {createdRoomId && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 rounded-xl bg-surface-container-high/40 border border-primary-container/30"
          >
            <div className="flex items-center justify-between">
              <span className="text-on-surface-variant text-sm">Your Room ID:</span>
              <motion.span 
                className="text-2xl font-headline font-bold tracking-wider"
                style={{ color: '#c3f5ff', textShadow: '0 0 10px rgba(0, 229, 255, 0.5)' }}
              >
                {createdRoomId}
              </motion.span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Decorative background elements */}
      <motion.div 
        className="absolute -top-20 -left-20 w-40 h-40 bg-primary-container/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default Lobby;
