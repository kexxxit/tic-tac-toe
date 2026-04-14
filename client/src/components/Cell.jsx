import { motion } from 'framer-motion';

const Cell = ({ value, onClick, disabled }) => {
  const isX = value === 'X';
  const isO = value === 'O';
  
  // Dynamic glow color for active player indicator
  const glowColor = isX ? '#00e5ff' : isO ? '#ff24e4' : 'transparent';

  return (
    <motion.div
      className={`
        relative w-full aspect-square rounded-lg cursor-pointer
        backdrop-blur-xl transition-all duration-300
        ${!value && !disabled ? 'cursor-pointer hover:scale-[1.02]' : ''}
      `}
      onClick={!value && !disabled ? onClick : undefined}
      initial={{ scale: 1 }}
      animate={{ 
        scale: value ? [1, 1.15, 1] : (!disabled ? 1 : 1),
        boxShadow: value 
          ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}80` 
          : 'none'
      }}
      transition={{ 
        type: 'spring', 
        bounce: 0.6, 
        duration: value ? 400 : 200 
      }}
      whileHover={!value && !disabled ? {
        scale: 1.05,
        backgroundColor: 'rgba(50, 53, 60, 0.8)', // surface-variant
      } : {}}
      style={{
        background: value 
          ? isX ? '#00e5ff20' : '#ff24e420'
          : 'rgba(29, 32, 38, 0.6)', // surface-container
        color: glowColor,
      }}
    >
      {/* Glass background layer */}
      <div className="absolute inset-0 rounded-lg opacity-50" />
      
      {/* Cell content - X or O symbol */}
      {value && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.7, duration: 300 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span 
            className={`text-5xl md:text-6xl font-bold ${isX ? 'font-headline' : ''}`}
            style={{
              color: isX ? '#c3f5ff' : '#fface8',
              textShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}60`,
            }}
          >
            {value}
          </span>
        </motion.div>
      )}

      {/* Hover indicator for empty cells */}
      {!value && !disabled && (
        <motion.div
          className="absolute inset-2 rounded-lg border-2"
          style={{ borderColor: 'rgba(132, 147, 150, 0.3)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

export default Cell;
