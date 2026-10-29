import React from 'react';
import { Play, Trophy, Users, Star, Flame, Zap, ExternalLink, ShieldAlert, Activity } from 'lucide-react';
import type { Game } from '../data/games';

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
  featured?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onPlay, featured = false }) => {
  return (
    <div
      onClick={() => onPlay(game)}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        featured
          ? 'border-blue-500/40 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950/90 shadow-blue-500/10 hover:border-blue-500/70 hover:shadow-blue-500/20'
          : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:shadow-indigo-500/10'
      }`}
    >
      {/* Background Subtle Glow */}
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl group-hover:bg-blue-500/20 transition-all duration-500" />
      <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-purple-600/10 blur-3xl group-hover:bg-purple-500/20 transition-all duration-500" />

      {/* Card Content Layout */}
      <div className={`p-5 flex flex-col ${featured ? 'md:flex-row md:items-center' : ''} gap-6 relative z-10`}>
        {/* Thumbnail Box */}
        <div className={`relative overflow-hidden rounded-xl border border-slate-700/60 bg-slate-950 ${featured ? 'w-full md:w-80 h-48 md:h-52 shrink-0' : 'w-full h-48'}`}>
          {game.id === 'retro-bowl' && (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 flex flex-col items-center justify-center p-4 text-center">
              <div className="text-4xl font-black tracking-widest text-amber-400 drop-shadow-[0_4px_12px_rgba(245,158,11,0.5)] uppercase font-mono">
                RETRO BOWL
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                  8-Bit Football Classic
                </span>
                <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                  HTML5
                </span>
              </div>
              <div className="mt-4 flex items-center justify-center gap-3 text-slate-300 text-xs">
                <div className="flex items-center gap-1"><Trophy className="w-3.5 h-3.5 text-amber-400" /> NFL Franchise</div>
                <div className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-blue-400" /> Fast Action</div>
              </div>
            </div>
          )}

          {game.id === 'bitlife' && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950 flex flex-col items-center justify-center p-4 text-center">
              <div className="text-3xl font-black tracking-widest text-purple-300 drop-shadow-[0_4px_12px_rgba(168,85,247,0.5)] uppercase font-mono">
                BITLIFE
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                  Life Simulator
                </span>
                <span className="bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                  Official Site
                </span>
              </div>
              <div className="mt-4 flex items-center justify-center gap-3 text-slate-300 text-xs">
                <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-purple-400" /> Life Choices</div>
              </div>
            </div>
          )}

          {game.id === 'basket-bros' && (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-950 via-red-950 to-slate-950 flex flex-col items-center justify-center p-4 text-center">
              <div className="text-3xl font-black tracking-widest text-orange-400 drop-shadow-[0_4px_12px_rgba(249,115,22,0.5)] uppercase font-mono flex items-center gap-2">
                <Activity className="w-7 h-7 text-orange-400" /> BASKET BROS
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="bg-orange-500/20 border border-orange-500/40 text-orange-300 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                  1v1 Hoops
                </span>
                <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                  Official Site
                </span>
              </div>
              <div className="mt-4 flex items-center justify-center gap-3 text-slate-300 text-xs">
                <div className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-orange-400" /> Monster Dunks</div>
              </div>
            </div>
          )}

          {/* Hover Overlay Play Icon */}
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/40 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              {game.embeddable ? (
                <Play className="h-6 w-6 fill-current ml-0.5" />
              ) : (
                <ExternalLink className="h-6 w-6 text-white" />
              )}
            </div>
          </div>

          {/* Top Tag Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {featured && (
              <span className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-md tracking-wider uppercase shadow-md">
                <Flame className="w-3 h-3 fill-current" /> Featured Game
              </span>
            )}
            {!game.embeddable && (
              <span className="flex items-center gap-1 bg-slate-900/90 border border-amber-500/40 text-amber-300 font-bold text-[10px] px-2.5 py-1 rounded-md tracking-wider uppercase backdrop-blur-md">
                <ShieldAlert className="w-3 h-3 text-amber-400" /> Official Link
              </span>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col flex-1 justify-between gap-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-blue-400" /> {game.category}
              </span>
              <div className="flex items-center gap-1 text-slate-400 text-xs bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/50">
                <Users className="w-3 h-3 text-emerald-400" /> {game.plays} Plays
              </div>
            </div>

            <h3 className="text-2xl font-black text-white tracking-wide group-hover:text-blue-400 transition-colors">
              {game.title}
            </h3>

            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {game.description}
            </p>
          </div>

          {/* Card Footer Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400">Rating:</span>
              <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
                ★ {game.rating}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlay(game);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all group-hover:shadow-blue-600/40"
            >
              {game.embeddable ? (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Play Now</span>
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Official</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
