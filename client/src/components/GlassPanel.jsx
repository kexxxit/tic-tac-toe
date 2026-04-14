import React from 'react';

/**
 * GlassPanel - Reusable glassmorphic panel component
 * 
 * Props:
 * - children: Content to render inside the panel
 * - variant: 'default' | 'strong' | 'minimal'
 * - className: Additional CSS classes
 * - glowColor: 'primary' | 'secondary' | 'tertiary' | null
 */
export default function GlassPanel({ 
  children, 
  variant = 'default', 
  className = '',
  glowColor = null,
  ...props 
}) {
  const baseClasses = 'glass-panel rounded-2xl';
  
  let shadowClasses = '';
  if (variant === 'strong') {
    shadowClasses = 'glass-panel-strong';
  }
  
  let glowClasses = '';
  if (glowColor === 'primary') {
    glowClasses = 'shadow-neon-primary border-cyan-400/30';
  } else if (glowColor === 'secondary') {
    glowClasses = 'shadow-neon-secondary border-pink-400/30';
  } else if (glowColor === 'tertiary') {
    glowClasses = 'shadow-neon-tertiary border-purple-400/30';
  }

  return (
    <div 
      className={`${baseClasses} ${variant === 'strong' ? shadowClasses : ''} ${glowClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
