import React from 'react';

/**
 * Background - Decorative background with grid pattern and glow effects
 * 
 * Props:
 * - children: Content to render on top of background
 * - showGrid: Whether to show the grid pattern overlay
 * - showBlobs: Whether to show animated glow blobs
 */
export default function Background({ children, showGrid = true, showBlobs = true }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Grid Pattern Overlay */}
      {showGrid && (
        <div 
          className="absolute inset-0 grid-pattern pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 229, 255, 0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      )}

      {/* Animated Glow Blobs */}
      {showBlobs && (
        <>
          {/* Primary Cyan Blob - Top Left */}
          <div 
            className="glow-blob glow-blob-primary animate-float"
            style={{
              width: '400px',
              height: '400px',
              top: '-100px',
              left: '-100px',
            }}
          />

          {/* Secondary Pink Blob - Bottom Right */}
          <div 
            className="glow-blob glow-blob-secondary animate-float"
            style={{
              width: '350px',
              height: '350px',
              bottom: '-100px',
              right: '-100px',
              animationDelay: '1s'
            }}
          />

          {/* Tertiary Purple Blob - Top Right */}
          <div 
            className="glow-blob glow-blob-tertiary animate-float"
            style={{
              width: '300px',
              height: '300px',
              top: '-50px',
              right: '-50px',
              animationDelay: '2s'
            }}
          />

          {/* Primary Cyan Blob - Bottom Left */}
          <div 
            className="glow-blob glow-blob-primary animate-float"
            style={{
              width: '350px',
              height: '350px',
              bottom: '-80px',
              left: '-80px',
              animationDelay: '1.5s'
            }}
          />
        </>
      )}

      {/* Content Container */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
