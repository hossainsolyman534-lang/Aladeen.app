import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Menu, 
  Star, 
  Download, 
  ArrowLeft, 
  MoreVertical, 
  Share2, 
  ChevronRight,
  LayoutGrid,
  X,
  ShoppingBag,
  CheckCircle2,
  ShieldCheck,
  Zap,
  TrendingUp,
  Plus,
  Filter,
  ArrowUpDown,
  Utensils,
  Shirt,
  Smartphone,
  Home as HomeIcon,
  Sparkles,
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_APPS, AppData, CATEGORIES, MOCK_REVIEWS } from './constants';

// --- Components ---

const AppCard: React.FC<{ app: AppData; onClick: () => void; variant?: 'default' | 'compact' }> = ({ app, onClick, variant = 'default' }) => (
  <motion.div 
    whileHover={{ y: -6 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`bg-white rounded-[2rem] border border-slate-100 overflow-hidden cursor-pointer group transition-all duration-300 ${variant === 'compact' ? 'p-3' : 'p-5'}`}
  >
    <div className={`aspect-square rounded-2xl overflow-hidden mb-4 shadow-sm relative transition-transform duration-300 group-hover:scale-105 ${variant === 'compact' ? 'w-16 h-16 mx-auto' : 'w-full'}`}>
      <img 
        src={app.icon} 
        alt={app.name} 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      {app.isVerified && (
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-sm border border-slate-50">
          <CheckCircle2 className="w-3.5 h-3.5 text-aladeen-green fill-aladeen-green/10" />
        </div>
      )}
    </div>
    <div className={variant === 'compact' ? 'text-center' : ''}>
      <h3 className={`font-bold text-slate-900 truncate mb-0.5 ${variant === 'compact' ? 'text-xs' : 'text-sm'}`}>{app.name}</h3>
      <p className="text-[10px] font-medium text-slate-400 truncate mb-2 uppercase tracking-wider">{app.developer}</p>
      <div className={`flex items-center gap-1.5 ${variant === 'compact' ? 'justify-center' : ''}`}>
        <div className="flex items-center gap-0.5 bg-slate-50 px-1.5 py-0.5 rounded-md">
          <span className="text-[10px] font-black text-slate-700">{app.rating}</span>
          <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
        </div>
        <span className="text-[10px] font-bold text-slate-300 ml-auto">{app.size}</span>
      </div>
    </div>
  </motion.div>
);

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'Marketplace': return <ShoppingBag className="w-6 h-6" />;
    case 'Grocery': return <Utensils className="w-6 h-6" />;
    case 'Fashion': return <Shirt className="w-6 h-6" />;
    case 'Electronics': return <Smartphone className="w-6 h-6" />;
    case 'Food Delivery': return <Utensils className="w-6 h-6" />;
    case 'Pharmacy': return <ShieldCheck className="w-6 h-6" />;
    case 'Home & Living': return <HomeIcon className="w-6 h-6" />;
    default: return <ShoppingBag className="w-6 h-6" />;
  }
};

const Section = ({ title, apps, onAppClick, onViewAll, icon: Icon }: { title: string; apps: AppData[]; onAppClick: (app: AppData) => void; onViewAll?: () => void; icon?: any }) => (
  <div className="mb-10">
    <div className="flex items-center justify-between px-6 mb-4">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5 text-aladeen-green" />}
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      </div>
      {onViewAll && (
        <button 
          onClick={onViewAll}
          className="text-sm font-bold text-aladeen-green hover:underline"
        >
          View All
        </button>
      )}
    </div>
    <div className="flex overflow-x-auto no-scrollbar gap-4 px-6 pb-4">
      {apps.map(app => (
        <div key={app.id} className="min-w-[140px] max-w-[140px]">
          <AppCard app={app} onClick={() => onAppClick(app)} />
        </div>
      ))}
    </div>
  </div>
);

const AppDetail = ({ app, onBack }: { app: AppData; onBack: () => void }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 20;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsDownloading(false);
          setProgress(0);
          alert("APK Downloaded successfully! (Simulation)");
        }, 500);
      }
      setProgress(p);
    }, 400);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-white z-50 overflow-y-auto"
    >
      <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 flex items-center justify-between px-6 py-4 border-b border-slate-50">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-700" />
        </button>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <Share2 className="w-5 h-5 text-slate-700" />
          </button>
          <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>

      <div className="px-6 py-8 max-w-2xl mx-auto">
        <div className="flex gap-6 mb-8">
          <div className="w-28 h-28 rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex-shrink-0">
            <img src={app.icon} alt={app.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-extrabold text-slate-900 leading-tight mb-1">{app.name}</h1>
            <p className="text-aladeen-green font-semibold text-sm mb-2">{app.developer}</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
                <span className="text-xs font-bold text-slate-700">{app.rating}</span>
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              </div>
              <span className="text-xs text-slate-400">{app.reviews} reviews</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-slate-50">
          <div className="text-center">
            <div className="text-sm font-bold text-slate-900">{app.size}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Size</div>
          </div>
          <div className="text-center border-x border-slate-50">
            <div className="text-sm font-bold text-slate-900">{app.downloads}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Downloads</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-slate-900">3+</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Rated</div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-10">
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg shadow-aladeen-green/20 transition-all flex items-center justify-center gap-2 ${
              isDownloading ? 'bg-slate-100 text-slate-400' : 'bg-aladeen-green text-white hover:bg-aladeen-dark active:scale-[0.98]'
            }`}
          >
            {isDownloading ? (
              <span>Downloading {Math.floor(progress)}%</span>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download APK
              </>
            )}
          </button>
          
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-1.5 text-aladeen-green">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-bold">Verified</span>
            </div>
            <div className="flex items-center gap-1.5 text-aladeen-green">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold">Safe Download</span>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Screenshots</h2>
          <div className="flex overflow-x-auto no-scrollbar gap-4">
            {app.screenshots.map((s, i) => (
              <img 
                key={i} 
                src={s} 
                alt="screenshot" 
                onClick={() => setSelectedScreenshot(s)}
                className="h-72 rounded-2xl shadow-md border border-slate-50 cursor-pointer hover:opacity-90 transition-opacity" 
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-900">About this app</h2>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>
          <div className="relative">
            <p className={`text-slate-600 text-sm leading-relaxed ${!isAboutExpanded ? 'line-clamp-3' : ''}`}>
              {app.description}
            </p>
            <button 
              onClick={() => setIsAboutExpanded(!isAboutExpanded)}
              className="mt-2 text-aladeen-green font-bold text-sm flex items-center gap-1 hover:underline"
            >
              {isAboutExpanded ? 'Show less' : 'Read more'}
              {!isAboutExpanded && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedScreenshot && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4">
            <button 
              onClick={() => setSelectedScreenshot(null)}
              className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white z-10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedScreenshot} 
              alt="screenshot full" 
              className="max-w-full max-h-full object-contain rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'home' | 'listing'>('home');
  const [selectedApp, setSelectedApp] = useState<AppData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'latest'>('popular');

  const filteredApps = useMemo(() => {
    let apps = [...MOCK_APPS];
    if (searchQuery) {
      apps = apps.filter(app => 
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.developer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory) {
      apps = apps.filter(app => app.category === selectedCategory);
    }
    
    if (sortBy === 'popular') {
      apps.sort((a, b) => b.rating - a.rating);
    } else {
      apps.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    }
    
    return apps;
  }, [searchQuery, selectedCategory, sortBy]);

  const featuredApps = useMemo(() => MOCK_APPS.filter(a => a.isFeatured), []);
  const trendingApps = useMemo(() => MOCK_APPS.filter(a => a.isTrending), []);
  const newlyAddedApps = useMemo(() => [...MOCK_APPS].sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, 4), []);
  
  const recommendedApps = useMemo(() => {
    // Simple logic: Mix of featured and trending, or just a random selection for now
    // In a real app, this would use download history from localStorage
    return [...MOCK_APPS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  }, []);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setView('listing');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md z-40 border-b border-slate-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div 
            className="text-2xl font-black text-aladeen-green cursor-pointer tracking-tighter"
            onClick={() => { setView('home'); setSelectedCategory(null); setSearchQuery(''); }}
          >
            aladeen<span className="text-slate-900">.app</span>
          </div>
          <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto pb-20">
        {view === 'home' ? (
          <>
            {/* Hero */}
            <div className="px-6 py-12 text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight"
              >
                All Your Favorite <br />
                <span className="text-aladeen-green">Shopping Apps</span> in One Place
              </motion.h1>
              
              <div className="relative max-w-xl mx-auto mb-12">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for apps (e.g. Daraz, Chaldal)" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all text-slate-700 shadow-sm"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value) setView('listing');
                  }}
                />
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 mb-12">
                {CATEGORIES.map(cat => (
                  <motion.div 
                    key={cat}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategoryClick(cat)}
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-aladeen-green group-hover:text-white transition-all shadow-sm">
                      <CategoryIcon category={cat} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{cat}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Home Sections */}
            <Section 
              title="Featured Apps" 
              apps={featuredApps} 
              onAppClick={setSelectedApp} 
              onViewAll={() => setView('listing')}
              icon={Star} 
            />
            <Section 
              title="Recommended for You" 
              apps={recommendedApps} 
              onAppClick={setSelectedApp} 
              onViewAll={() => setView('listing')}
              icon={Sparkles} 
            />
            <Section 
              title="Trending Now" 
              apps={trendingApps} 
              onAppClick={setSelectedApp} 
              onViewAll={() => { setView('listing'); setSortBy('popular'); }}
              icon={TrendingUp} 
            />
            <Section 
              title="Newly Added" 
              apps={newlyAddedApps} 
              onAppClick={setSelectedApp} 
              onViewAll={() => { setView('listing'); setSortBy('latest'); }}
              icon={Plus} 
            />
          </>
        ) : (
          <div className="px-6 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  {selectedCategory || (searchQuery ? `Search: ${searchQuery}` : 'All Apps')}
                </h2>
                <p className="text-sm text-slate-500">{filteredApps.length} apps found</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select 
                    className="bg-transparent text-sm font-semibold text-slate-700 outline-none"
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                  >
                    <option value="">All Categories</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                  <ArrowUpDown className="w-4 h-4 text-slate-400" />
                  <select 
                    className="bg-transparent text-sm font-semibold text-slate-700 outline-none"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                  >
                    <option value="popular">Popular</option>
                    <option value="latest">Latest</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {filteredApps.map(app => (
                <AppCard key={app.id} app={app} onClick={() => setSelectedApp(app)} />
              ))}
            </div>

            {filteredApps.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No apps found</h3>
                <p className="text-slate-500 text-sm">Try adjusting your search or filters</p>
                <button 
                  onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
                  className="mt-6 text-aladeen-green font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* App Detail Overlay */}
      <AnimatePresence>
        {selectedApp && (
          <AppDetail 
            app={selectedApp} 
            onBack={() => setSelectedApp(null)} 
          />
        )}
      </AnimatePresence>

      {/* Footer (Minimal) */}
      <footer className="bg-slate-50 py-12 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xl font-black text-aladeen-green mb-4 tracking-tighter">
            aladeen<span className="text-slate-900">.app</span>
          </div>
          <p className="text-slate-400 text-xs mb-6">
            The cleanest platform for Bangladeshi e-commerce APKs. <br />
            Safe, verified, and fast.
          </p>
          <div className="flex justify-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-aladeen-green transition-colors">Privacy</a>
            <a href="#" className="hover:text-aladeen-green transition-colors">Terms</a>
            <a href="#" className="hover:text-aladeen-green transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
