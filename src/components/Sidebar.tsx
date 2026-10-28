import React from 'react';
import { Home, Gamepad2, GraduationCap, ShieldCheck, Laptop, Sparkles } from 'lucide-react';

interface SidebarProps {
  activeTab: 'home' | 'games';
  setActiveTab: (tab: 'home' | 'games') => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  totalGamesCount: number;
  categories: string[];
  onSelectGame?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  totalGamesCount,
  categories,
  onSelectGame,
}) => {
  return (
    <aside className="w-full md:w-64 shrink-0 flex flex-col gap-6 p-4 md:p-6 bg-slate-900/40 border-b md:border-b-0 md:border-r border-slate-800/80">
      {/* Primary Navigation Links */}
      <nav className="flex flex-row md:flex-col gap-2">
        <button
          onClick={() => {
            setActiveTab('home');
            setSelectedCategory('All');
            if (onSelectGame) onSelectGame();
          }}
          className={`flex-1 md:flex-none flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
            activeTab === 'home'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('games');
            setSelectedCategory('All');
            if (onSelectGame) onSelectGame();
          }}
          className={`flex-1 md:flex-none flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
            activeTab === 'games' && selectedCategory === 'All'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Gamepad2 className="h-4 w-4" />
          <span>All Games</span>
          <span className="ml-auto rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-300 font-bold">
            {totalGamesCount}
          </span>
        </button>
      </nav>

      {/* Category Filter Pills */}
      <div className="flex flex-col gap-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Categories
        </div>
        <div className="flex flex-wrap md:flex-col gap-1.5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveTab('games');
                setSelectedCategory(category);
                if (onSelectGame) onSelectGame();
              }}
              className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <span>{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* System & Device Info Box */}
      <div className="hidden md:flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 mt-auto">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Laptop className="h-4 w-4 text-blue-400" />
          <span>Chromebook Ready</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Optimized for high performance and smooth frame rates on school Chromebooks and lower-spec devices.
        </p>
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 rounded-lg px-2.5 py-1.5 border border-emerald-500/20">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Bypass Securly Headers</span>
        </div>
      </div>

      {/* Learning Portal Info Card */}
      <div className="hidden md:flex flex-col gap-2 rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-4">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
          <GraduationCap className="h-4 w-4 text-indigo-400" />
          <span>CMS Learning Portal</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Browser tab disguise is active. Your browser title will display as "CMS Learning Portal".
        </p>
      </div>
    </aside>
  );
};
