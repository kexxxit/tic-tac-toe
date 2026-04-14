// ProfileCard Component - Player profile display
import React from 'react';
import GlassPanel from './GlassPanel';

export default function ProfileCard({ username, symbol, status = 'online', isHost = false }) {
  const symbolColorClass = symbol === 'X' ? 'text-primary' : 'text-secondary';
  
  return (
    <div className="flex items-center gap-4">
      {/* Symbol Avatar */}
      <GlassPanel variant={symbol === 'X' ? 'primary' : 'secondary'} className="w-16 h-16 flex items-center justify-center">
        <span className={`text-3xl font-headline font-bold ${symbolColorClass}`}>
          {symbol}
        </span>
      </GlassPanel>

      {/* Profile Info */}
      <div className="flex-1 text-left">
        <h4 className="font-label font-semibold text-white mb-1">{username}</h4>
        
        {/* Status Badge */}
        {status === 'online' && (
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-label">Online</span>
          </span>
        )}

        {/* Host Badge */}
        {isHost && (
          <span className="ml-2 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full">
            <span className="text-primary text-xs font-label">HOST</span>
          </span>
        )}
      </div>
    </div>
  );
}
