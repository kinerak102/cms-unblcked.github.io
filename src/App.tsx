import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { GameCard } from './components/GameCard';
import { GamePlayer } from './components/GamePlayer';
import { GAMES, type Game } from './data/games';
import { Gamepad2, SearchX, Sparkles, Trophy, ShieldCheck, Cpu, History, Flame } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'games'>('home');
  const [currentView, setCurrentView] = useState<'library' | 'player'>('library');
  const [selectedGame, setSelectedGame] = useState<Game>(GAMES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [recentlyPlayedIds, setRecentlyPlayedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cms_recently_played');
      return saved ? JSON.parse(saved) : ['retro-bowl'];
    } catch {
      return ['retro-bowl'];
    }
  });

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(GAMES.map((g) => g.category)))];

  // Handle URL hash routing and browser back button state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const gameMatch = hash.match(/^#\/games\/([a-z0-9-]+)$/);

      if (gameMatch) {
        const gameId = gameMatch[1];
        const found = GAMES.find((g) => g.id === gameId);
        if (found) {
          setSelectedGame(found);
          setCurrentView('player');
          return;
        }
      }

      setCurrentView('library');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePlayGame = (game: Game) => {
    // Update recently played list
    setRecentlyPlayedIds((prev) => {
      const filtered = prev.filter((id) => id !== game.id);
      const updated = [game.id, ...filtered].slice(0, 5);
      try {
        localStorage.setItem('cms_recently_played', JSON.stringify(updated));
      } catch (err) {
        console.error('LocalStorage write failed:', err);
      }
      return updated;
    });

    setSelectedGame(game);
    window.location.hash = `/games/${game.id}`;
    setCurrentView('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLibrary = () => {
    window.location.hash = '';
    setCurrentView('library');
  };

  // Filter games by search query and category
  const filteredGames = GAMES.filter((game) => {
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesTitle = game.title.toLowerCase().includes(query);
    const matchesDesc = game.description.toLowerCase().includes(query);
    const matchesCategoryName = game.category.toLowerCase().includes(query);
    const matchesTags = game.tags.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && (matchesTitle || matchesDesc || matchesCategoryName || matchesTags);
  });

  const featuredGames = GAMES.filter((g) => g.featured);
  const recentlyPlayedGames = recentlyPlayedIds
    .map((id) => GAMES.find((g) => g.id === id))
    .filter((g): g is Game => Boolean(g));

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
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          totalGamesCount={GAMES.length}
          categories={categories}
          onSelectGame={handleBackToLibrary}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col gap-8">
          {currentView === 'player' ? (
            /* Embedded Gameplay View */
            <GamePlayer game={selectedGame} onBack={handleBackToLibrary} />
          ) : (
            /* Game Library / Homepage View */
            <>
              {/* Banner Hero Section */}
              {activeTab === 'home' && !searchQuery && selectedCategory === 'All' && (
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
                      CMS UNBLOCKED provides lightning-fast, high-framerate browser games specifically optimized for school Chromebooks with an educational tab profile.
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

              {/* Recently Played Section */}
              {activeTab === 'home' && !searchQuery && selectedCategory === 'All' && recentlyPlayedGames.length > 0 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
                    <History className="w-4 h-4 text-blue-400" /> Recently Played
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentlyPlayedGames.map((game) => (
                      <div
                        key={`recent-${game.id}`}
                        onClick={() => handlePlayGame(game)}
                        className="cursor-pointer bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 p-4 rounded-xl flex items-center justify-between transition-all"
                      >
                        <div>
                          <div className="text-sm font-bold text-white">{game.title}</div>
                          <div className="text-xs text-slate-400">{game.category}</div>
                        </div>
                        <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                          Play
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured Games Section */}
              {activeTab === 'home' && !searchQuery && selectedCategory === 'All' && featuredGames.length > 0 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
                    <Flame className="w-4 h-4 text-amber-400" /> Featured Collection
                  </div>
                  <div className="flex flex-col gap-6">
                    {featuredGames.map((game) => (
                      <GameCard key={`featured-${game.id}`} game={game} onPlay={handlePlayGame} featured={true} />
                    ))}
                  </div>
                </div>
              )}

              {/* Game Section Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {searchQuery
                        ? `Search Results for "${searchQuery}"`
                        : selectedCategory !== 'All'
                        ? `${selectedCategory} Games`
                        : activeTab === 'home'
                        ? 'All Catalog Games'
                        : 'Game Library'}
                    </h2>
                    <p className="text-xs text-slate-400">
                      Select a game card to launch or open the official game page.
                    </p>
                  </div>
                </div>

                <div className="text-xs font-semibold text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                  Showing {filteredGames.length} {filteredGames.length === 1 ? 'Game' : 'Games'}
                </div>
              </div>

              {/* Game Cards Grid */}
              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {filteredGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onPlay={handlePlayGame}
                      featured={game.featured && activeTab === 'games'}
                    />
                  ))}
                </div>
              ) : (
                /* No Results Found View */
                <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
                  <div className="p-4 bg-slate-800/50 rounded-full text-slate-400 mb-4">
                    <SearchX className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">No Games Found</h3>
                  <p className="text-xs text-slate-400 max-w-sm mb-4">
                    We couldn't find any games matching "{searchQuery}". Try clearing search filters or selecting another category.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors"
                  >
                    Clear Search & Category Filters
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
                  <span className="flex items-center gap-1"><Trophy className="w-3.5 h-3.5 text-amber-400" /> Multi-Game Edition</span>
                  <span>•</span>
                  <span>CMS Portal v2.0</span>
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
