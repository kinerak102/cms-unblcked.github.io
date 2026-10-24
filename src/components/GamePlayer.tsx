import React, { useState, useRef } from 'react';
import { ArrowLeft, Maximize2, Minimize2, RotateCcw, AlertTriangle, ShieldCheck, Keyboard, MousePointer } from 'lucide-react';

interface GamePlayerProps {
  onBack: () => void;
}

export const GamePlayer: React.FC<GamePlayerProps> = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [useMirrorSource, setUseMirrorSource] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Embedded URL: Primary is locally hosted, secondary is high-availability githack mirror
  const primaryUrl = '/game/retro-bowl/index.html';
  const mirrorUrl = 'https://raw.githack.com/3kho/retro-bowl/main/production.html';
  const activeUrl = useMirrorSource ? mirrorUrl : primaryUrl;

  const handleReload = () => {
    setIsLoading(true);
    setHasError(false);
    if (iframeRef.current) {
      iframeRef.current.src = activeUrl;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Error attempting to enable full-screen mode:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.error('Error attempting to exit full-screen mode:', err);
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-6xl mx-auto">
      {/* Game Control Navigation Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3 sm:p-4 rounded-2xl backdrop-blur-md">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-4 py-2 rounded-xl transition-colors border border-slate-700/50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
            Retro Bowl
          </h2>
          <span className="hidden sm:inline-block text-xs font-medium text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700/50">
            Internal Route: /games/retro-bowl
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReload}
            title="Reload Game"
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs sm:text-sm px-3 py-2 rounded-xl transition-colors border border-slate-700/50"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reload</span>
          </button>

          <button
            onClick={toggleFullscreen}
            title="Fullscreen"
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm px-3.5 py-2 rounded-xl transition-all shadow-md shadow-blue-600/20"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-4 h-4" />
                <span className="hidden sm:inline">Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4" />
                <span className="hidden sm:inline">Fullscreen</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Game Screen Container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-video bg-black rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center group"
      >
        {/* Loading Overlay Spinner */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 z-20 bg-slate-950 flex flex-col items-center justify-center gap-3 text-slate-300">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            <span className="text-sm font-semibold tracking-wider text-slate-200">
              Loading Retro Bowl Engine...
            </span>
            <span className="text-xs text-slate-400">
              Initializing HTML5 Game Canvas
            </span>
          </div>
        )}

        {/* Error Fallback Notice */}
        {hasError && (
          <div className="absolute inset-0 z-30 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 mb-3">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Embedding Notice
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              If the local game engine source is blocked by browser policies or school filtering restrictions, you can switch to the high-compatibility fallback mirror.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => {
                  setUseMirrorSource(!useMirrorSource);
                  handleReload();
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
              >
                Switch to {useMirrorSource ? 'Primary Local Source' : 'Fallback Mirror'}
              </button>
              <button
                onClick={handleReload}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-4 py-2.5 rounded-xl transition-all border border-slate-700"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Embedded Game Iframe */}
        <iframe
          ref={iframeRef}
          src={activeUrl}
          title="Retro Bowl Embedded Game"
          className="w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          allow="autoplay; fullscreen; keyboard; gamepad"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>

      {/* Game Helper & Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <MousePointer className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Passing & Aiming</div>
            <div className="text-xs text-slate-400">Click & drag mouse/touch to target receiver</div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Keyboard className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Runner Controls</div>
            <div className="text-xs text-slate-400">W/S or Up/Down arrows to juke defenders</div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl sm:col-span-2 lg:col-span-1">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Securly Bypass Verified</div>
            <div className="text-xs text-slate-400">Self-hosted HTML5 engine running in iframe</div>
          </div>
        </div>
      </div>
    </div>
  );
};
