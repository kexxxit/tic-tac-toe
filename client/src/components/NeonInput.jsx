import React from 'react';

/**
 * NeonInput - Reusable neon-styled input component
 * 
 * Props:
 * - value: Input value
 * - onChange: Change handler
 * - placeholder: Placeholder text
 * - label: Label text (optional)
 * - error: Error message (optional)
 * - icon: Icon name (Material Symbols)
 * - type: 'text' | 'password' | 'email'
 * - className: Additional CSS classes
 */
export default function NeonInput({ 
  value,
  onChange,
  placeholder = '',
  label = null,
  error = null,
  icon = null,
  type = 'text',
  className = '',
  ...props 
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-label text-on-surface-variant mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 rounded-xl
            bg-surface-container-low
            border-2 transition-all duration-300
            font-body text-on-surface
            placeholder:text-on-surface-variant/50
            focus:outline-none focus:ring-0
            ${error 
              ? 'border-error shadow-neon-secondary'
              : 'border-outline-variant hover:border-primary/50 focus:border-primary shadow-neon-primary'
            }
            ${icon ? 'pl-11' : ''}
            ${className}
          `}
          {...props}
        />
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">
            {icon}
          </span>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-error">{error}</p>
      )}
    </div>
  );
}
