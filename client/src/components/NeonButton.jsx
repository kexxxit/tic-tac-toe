import React from 'react';

/**
 * NeonButton - Reusable neon-styled button component
 * 
 * Props:
 * - children: Button content (text or icon)
 * - onClick: Click handler
 * - variant: 'primary' | 'secondary' | 'outline' | 'ghost'
 * - size: 'sm' | 'md' | 'lg' | 'xl'
 * - disabled: Whether button is disabled
 * - fullWidth: Make button full width
 * - icon: Icon name (Material Symbols)
 * - className: Additional CSS classes
 */
export default function NeonButton({ 
  children, 
  onClick,
  variant = 'primary', 
  size = 'md',
  disabled = false,
  fullWidth = false,
  icon = null,
  loading = false,
  className = '',
  ...props 
}) {
  // Base button classes
  const baseClasses = 'relative inline-flex items-center justify-center font-label transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variant styles
  const variantStyles = {
    primary: {
      bg: 'bg-primary-container',
      text: 'text-on-primary-container',
      shadow: 'shadow-neon-primary hover:shadow-neon-primary-hover',
      border: '',
    },
    secondary: {
      bg: 'bg-secondary-container',
      text: 'text-on-secondary-container',
      shadow: 'shadow-neon-secondary hover:shadow-neon-secondary-hover',
      border: '',
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-primary',
      shadow: '',
      border: 'border-2 border-primary hover:bg-primary/10',
    },
    ghost: {
      bg: 'hover:bg-surface-container-low',
      text: 'text-on-surface',
      shadow: '',
      border: '',
    },
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm gap-1.5 rounded-lg',
    md: 'px-5 py-3 text-base gap-2 rounded-xl',
    lg: 'px-6 py-4 text-lg gap-2.5 rounded-2xl',
    xl: 'px-8 py-5 text-xl gap-3 rounded-2xl',
  };

  const style = variantStyles[variant];
  const sizing = sizeStyles[size];

  return (
    <button
      type={props.type || 'button'}
      className={`
        ${baseClasses}
        ${style.bg} ${style.text} ${style.shadow} ${style.border}
        ${sizing}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? '' : 'active:scale-95 hover:-translate-y-0.5'}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-inherit">
          <span className="animate-spin">⌛</span>
        </span>
      )}
      {!loading && icon && !children && (
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      )}
      {children && (
        <>
          {icon && (
            <span className="material-symbols-outlined">{icon}</span>
          )}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
