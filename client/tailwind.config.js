/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary (Cyan) - X Player
        primary: '#c3f5ff',
        'primary-container': '#00e5ff',
        'primary-fixed': '#9cf0ff',
        'primary-fixed-dim': '#00daf3',
        'on-primary': '#00363d',
        'on-primary-container': '#00626e',
        'on-primary-fixed': '#001f24',
        'on-primary-fixed-variant': '#004f58',
        
        // Secondary (Magenta/Pink) - O Player
        secondary: '#fface8',
        'secondary-container': '#ff24e4',
        'secondary-fixed': '#ffd7f0',
        'secondary-fixed-dim': '#fface8',
        'on-secondary': '#5e0053',
        'on-secondary-container': '#520049',
        'on-secondary-fixed': '#3a0033',
        'on-secondary-fixed-variant': '#840076',
        
        // Tertiary
        tertiary: '#f2e9ff',
        'tertiary-container': '#d9c8ff',
        'tertiary-fixed': '#e9ddff',
        'tertiary-fixed-dim': '#d1bcff',
        'on-tertiary': '#3c0090',
        'on-tertiary-container': '#6c00f7',
        'on-tertiary-fixed': '#23005b',
        'on-tertiary-fixed-variant': '#5700c9',
        
        // Error
        error: '#ffb4ab',
        'error-container': '#93000a',
        'on-error': '#690005',
        'on-error-container': '#ffdad6',
        
        // Background & Surface
        background: '#10131a',
        'on-background': '#e1e2eb',
        surface: '#10131a',
        'on-surface': '#e1e2eb',
        'surface-bright': '#363940',
        'surface-container': '#1d2026',
        'surface-container-high': '#272a31',
        'surface-container-highest': '#32353c',
        'surface-container-low': '#191c22',
        'surface-container-lowest': '#0b0e14',
        'surface-variant': '#32353c',
        'on-surface-variant': '#bac9cc',
        'surface-tint': '#00daf3',
        
        // Outline
        outline: '#849396',
        'outline-variant': '#3b494c',
        
        // Inverse
        'inverse-surface': '#e1e2eb',
        'inverse-on-surface': '#2e3037',
        'inverse-primary': '#006875',
      },
      fontFamily: {
        headline: ['Space Grotesk', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
        label: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px',
      },
      boxShadow: {
        // Neon glow effects
        'neon-primary': '0 0 20px rgba(0, 229, 255, 0.4)',
        'neon-primary-hover': '0 0 30px rgba(0, 229, 255, 0.6)',
        'neon-secondary': '0 0 20px rgba(255, 172, 232, 0.4)',
        'neon-secondary-hover': '0 0 30px rgba(255, 172, 232, 0.6)',
        // Glass modal shadow with tint
        'glass': '0px 20px 40px rgba(0, 0, 0, 0.4)',
        'glass-tinted': '0px 20px 40px rgba(0, 218, 243, 0.2)',
        // Ambient glow for active elements
        'glow-primary-active': '0 0 30px rgba(0, 229, 255, 0.4), 0 0 60px rgba(0, 229, 255, 0.2)',
        'glow-secondary-active': '0 0 30px rgba(255, 172, 232, 0.4), 0 0 60px rgba(255, 172, 232, 0.2)',
      },
      animation: {
        // Background ambient effects
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        // Active player pulse indicator
        'pulse-active': 'pulseActive 1.5s ease-in-out infinite',
        // Cell hover/pop effects
        'cell-pop': 'cellPop 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        // Gradient shift for backgrounds
        'gradient-shift': 'gradientShift 3s ease infinite',
      },
      keyframes: {
        ...theme('keyframes'),
        pulseActive: {
          '0%, 100%': { boxShadow: '0 0 20px var(--glow-color)' },
          '50%': { boxShadow: '0 0 35px var(--glow-color)' },
        },
        cellPop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    }
  },
  plugins: [],
}
