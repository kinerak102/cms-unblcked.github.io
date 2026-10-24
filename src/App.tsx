import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { GameCard } from './components/GameCard';
import { GamePlayer } from './components/GamePlayer';
import { Gamepad2, SearchX, Sparkles, Trophy, ShieldCheck, Cpu } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'games'>('home');
  const [currentView, setCurrentView] = useState<'library' | 'player'>('library');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle URL hash routing and browser back button state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/games/retro-bowl') {
        setCurrentView('player');
      } else {
        setCurrentView('library');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePlayRetroBowl = () => {
    window.location.hash = '/games/retro-bowl';
    setCurrentView('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLibrary = () => {
    window.location.hash = '';
    setCurrentView('library');
  };

  // Filter game matching search query
  const matchesSearch = 'retro bowl american football nfl sports 3kh0'.toLowerCase().includes(searchQuery.toLowerCase().trim());

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNavigateHome={handleBackToLibrary}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container Layout */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (currentView === 'player') {
              handleBackToLibrary();
            }
          }}
          onSelectGame={handleBackToLibrary}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col gap-8">
          {currentView === 'player' ? (
            /* Embedded Gameplay View */
            <GamePlayer onBack={handleBackToLibrary} />
          ) : (
            /* Game Library / Homepage View */
            <>
              {/* Banner Hero Section */}
              {activeTab === 'home' && !searchQuery && (
                <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-slate-900/80 p-6 sm:p-8 shadow-2xl">
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
                  <div className="absolute bottom-0 left-1/3 -mb-16 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />

                  <div className="relative z-10 max-w-2xl flex flex-col gap-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300 w-fit">
                      <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                      <span>Next-Gen Educational Web Gaming</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                      Unblocked Gaming <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                        Without Restrictions.
                      </span>
                    </h1>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      CMS UNBLOCKED provides lightning-fast, high-framerate HTML5 browser games specifically optimized to bypass school filters like Securly while presenting a discreet browser profile.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-900/80 border border-slate-800 px-3 py-2 rounded-xl">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" /> Securly Pass Guarantee
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-900/80 border border-slate-800 px-3 py-2 rounded-xl">
                        <Cpu className="w-4 h-4 text-blue-400" /> Chromebook Hardware Acceleration
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Game Section Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {searchQuery ? `Search Results for "${searchQuery}"` : activeTab === 'home' ? 'Featured Game' : 'Game Library'}
                    </h2>
                    <p className="text-xs text-slate-400">
                      Select a game to start playing directly in your browser.
                    </p>
                  </div>
                </div>

                <div className="text-xs font-semibold text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                  Showing 1 Game
                </div>
              </div>

              {/* Game Cards Grid */}
              {matchesSearch ? (
                <div className="flex flex-col gap-6">
                  <GameCard onPlay={handlePlayRetroBowl} featured={true} />
                </div>
              ) : (
                /* No Results Found View */
                <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
                  <div className="p-4 bg-slate-800/50 rounded-full text-slate-400 mb-4">
                    <SearchX className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">No Games Found</h3>
                  <p className="text-xs text-slate-400 max-w-sm mb-4">
                    We couldn't find any games matching "{searchQuery}". Retro Bowl is currently the primary featured game in this library.
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors"
                  >
                    Clear Search Filter
                  </button>
                </div>
              )}

              {/* Educational Portal Footer */}
              <footer className="mt-auto border-t border-slate-800/80 pt-6 text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-400">CMS UNBLOCKED</span>
                  <span>— Educational Learning Portal</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <span className="flex items-center gap-1"><Trophy className="w-3.5 h-3.5 text-amber-400" /> Retro Bowl Edition</span>
                  <span>•</span>
                  <span>CMS Portal v1.0</span>
                </div>
              </footer>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
