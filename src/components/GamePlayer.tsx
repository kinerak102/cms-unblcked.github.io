import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Maximize2, Minimize2, RotateCcw, AlertTriangle, ShieldCheck, Keyboard, MousePointer, ExternalLink, ShieldAlert } from 'lucide-react';
import type { Game } from '../data/games';

interface GamePlayerProps {
  game?: Game;
  onBack: () => void;
}

export const GamePlayer: React.FC<GamePlayerProps> = ({ game, onBack }) => {
  const currentGame: Game = game || {
    id: 'retro-bowl',
    title: 'Retro Bowl',
    category: 'Sports',
    description: 'Retro Bowl',
    embeddable: true,
    sourceUrl: './game/retro-bowl/index.html',
    officialUrl: 'https://poki.com/en/g/retro-bowl',
    rating: 4.9,
    plays: '12.4k',
  };

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [useMirrorSource, setUseMirrorSource] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setUseMirrorSource(false);
  }, [currentGame.id]);

  const primaryUrl = currentGame.sourceUrl || currentGame.officialUrl;
  const mirrorUrl = currentGame.id === 'retro-bowl' ? 'https://raw.githack.com/3kho/retro-bowl/main/production.html' : primaryUrl;
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

  const handleOpenOfficial = () => {
    window.open(currentGame.officialUrl, '_blank', 'noopener,noreferrer');
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
            {currentGame.title}
          </h2>
          <span className="hidden sm:inline-block text-xs font-medium text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700/50">
            Internal Route: /games/{currentGame.id}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {currentGame.embeddable && (
            <>
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
            </>
          )}

          <button
            onClick={handleOpenOfficial}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm px-3.5 py-2 rounded-xl transition-all border border-slate-700/50"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Official Site</span>
          </button>
        </div>
      </div>

      {/* Main Game Screen Container */}
      {currentGame.embeddable ? (
        <div
          ref={containerRef}
          className="relative w-full aspect-video bg-black rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center group"
        >
          {/* Loading Overlay Spinner */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 z-20 bg-slate-950 flex flex-col items-center justify-center gap-3 text-slate-300">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
              <span className="text-sm font-semibold tracking-wider text-slate-200">
                Loading {currentGame.title} Engine...
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
                If the game source is blocked by browser policies or network restrictions, you can open the official site.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {currentGame.id === 'retro-bowl' && (
                  <button
                    onClick={() => {
                      setUseMirrorSource(!useMirrorSource);
                      handleReload();
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
                  >
                    Switch to {useMirrorSource ? 'Primary Local Source' : 'Fallback Mirror'}
                  </button>
                )}
                <button
                  onClick={handleOpenOfficial}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-4 py-2.5 rounded-xl transition-all border border-slate-700"
                >
                  Open Official Site
                </button>
              </div>
            </div>
          )}

          {/* Embedded Game Iframe */}
          <iframe
            ref={iframeRef}
            src={activeUrl}
            title={`${currentGame.title} Embedded Game`}
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
      ) : (
        /* Non-Embeddable Official Game Fallback Card */
        <div className="w-full p-8 sm:p-12 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col items-center text-center max-w-3xl mx-auto shadow-2xl">
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400 mb-4">
            <ShieldAlert className="w-12 h-12" />
          </div>

          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-3">
            Source Security Policy Restriction
          </span>

          <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
            Play {currentGame.title} on Official Site
          </h3>

          <p className="text-sm text-slate-300 max-w-xl leading-relaxed mb-6">
            <strong className="text-white">{currentGame.title}</strong> enforces strict browser security headers (<code className="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded text-xs">X-Frame-Options: SAMEORIGIN</code>). To guarantee full gameplay features, cloud saves, and high performance, play directly on the official host site.
          </p>

          <div className="flex flex-wrap gap-4 justify-center w-full max-w-md">
            <button
              onClick={handleOpenOfficial}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/30 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Open Official {currentGame.title} Site</span>
            </button>
            <button
              onClick={onBack}
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm py-3.5 px-6 rounded-xl border border-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Library</span>
            </button>
          </div>
        </div>
      )}

      {/* Game Helper & Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <MousePointer className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Interactive Controls</div>
            <div className="text-xs text-slate-400">Mouse / touch gestures supported</div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Keyboard className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Keyboard Navigation</div>
            <div className="text-xs text-slate-400">Arrow keys & WASD bindings</div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl sm:col-span-2 lg:col-span-1">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">CMS Portal Verified</div>
            <div className="text-xs text-slate-400">Tested & validated for school devices</div>
          </div>
        </div>
      </div>
    </div>
  );
};
