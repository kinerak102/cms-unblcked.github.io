import React from 'react';
import { Search, Shield, Sparkles, X, Home, Gamepad2 } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNavigateHome: () => void;
  activeTab: 'home' | 'games';
  setActiveTab: (tab: 'home' | 'games') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  onNavigateHome,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b1120]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveTab('home');
              onNavigateHome();
            }}
            className="group flex items-center gap-3 focus:outline-none"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950 font-black text-blue-400">
                C
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-extrabold tracking-wider text-white">
                CMS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">UNBLOCKED</span>
              </span>
              <span className="flex items-center gap-1 text-[10px] font-medium tracking-wider text-emerald-400 uppercase">
                <Shield className="h-2.5 w-2.5" /> Securly Pass
              </span>
            </div>
          </button>
        </div>

        {/* Quick Nav Header Links */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              setActiveTab('home');
              onNavigateHome();
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'home'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" /> Home
          </button>
          <button
            onClick={() => {
              setActiveTab('games');
              onNavigateHome();
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'games'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" /> Games
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative hidden max-w-sm flex-1 px-4 sm:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search games or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-2 pl-10 pr-10 text-sm text-slate-200 placeholder-slate-400 transition-all focus:border-blue-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Portal Info Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300 md:flex">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Educational Portal Mode</span>
          </div>
        </div>
      </div>

      {/* Mobile Search Input */}
      <div className="px-4 pb-3 sm:hidden">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-2 pl-10 pr-10 text-sm text-slate-200 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
