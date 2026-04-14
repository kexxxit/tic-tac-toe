// GlassPanel Component - Reusable glassmorphic container
import React from 'react';

const variantStyles = {
  primary: 'bg-surface-primary border-primary/30',
  secondary: 'bg-surface-secondary border-secondary/30',
  elevated: 'bg-surface-elevated border-outline-variant shadow-xl',
  subtle: 'bg-surface-dark border-outline-variant',
  hoverable: 'bg-surface-dark border-outline-variant hover:border-primary/50 hover:bg-surface-hover',
};

const glowColors = {
  primary: 'shadow-[0_0_30px_rgba(0,229,255,0.3)]',
  secondary: 'shadow-[0_0_30px_rgba(255,100,218,0.3)]',
};

export default function GlassPanel({ 
  variant = 'subtle', 
  className = '', 
  children,
  hoverEffect = false,
  glowColor = null,
  ...props 
}) {
  const baseClasses = `relative overflow-hidden rounded-2xl border transition-all duration-300 ${variantStyles[variant]}`;
  
  const hoverClasses = hoverEffect 
    ? 'hover:scale-[1.02] hover:border-opacity-50' 
    : '';
  
  const glowClasses = glowColor && variant === 'primary'
    ? glowColors[glowColor]
    : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${glowClasses} ${className}`} {...props}>
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
