// NeonButton Component - Styled button with neon glow effects
import React from 'react';

const variantStyles = {
  primary: 
    'bg-primary/20 hover:bg-primary/30 text-primary border-primary/50 shadow-[0_0_20px_rgba(0,229,255,0.2)]',
  secondary: 
    'bg-secondary/20 hover:bg-secondary/30 text-secondary border-secondary/50 shadow-[0_0_20px_rgba(255,100,218,0.2)]',
  neutral: 
    'bg-surface-dark hover:bg-surface-hover text-white border-outline-variant',
};

const sizeStyles = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
};

export default function NeonButton({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  icon = null,
  children,
  className = '',
  disabled = false,
  ...props 
}) {
  const baseClasses = `relative overflow-hidden rounded-xl border transition-all duration-300 font-label font-semibold flex items-center justify-center gap-2 ${variantStyles[variant]} ${sizeStyles[size]}`;
  
  const fullWidthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed hover:scale-[1]' : 'hover:scale-[1.02]';

  return (
    <button className={`${baseClasses} ${fullWidthClass} ${disabledClass} ${className}`} {...props}>
      {/* Icon */}
      {icon && (
        <span className="material-symbols-outlined text-lg">{icon}</span>
      )}
      
      {/* Button content */}
      {children}
    </button>
  );
}
