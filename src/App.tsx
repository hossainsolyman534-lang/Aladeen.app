import React, { useState, useMemo } from 'react';
import { Toaster, toast } from 'sonner';
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
  Home,
  Trash2,
  ExternalLink,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_APPS, AppData, CATEGORIES, MOCK_REVIEWS, CategoryData } from './constants';

// --- Components ---

const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) return <>{text}</>;
  
  // Split highlight into individual words and filter out empty strings
  const words = highlight.trim().split(/\s+/).filter(word => word.length > 0);
  if (words.length === 0) return <>{text}</>;

  // Create a regex that matches any of the words
  const pattern = words.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');
  
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) => (
        words.some(word => word.toLowerCase() === part.toLowerCase()) ? (
          <span key={i} className="text-aladeen-green bg-aladeen-green/10 rounded-sm px-0.5">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      ))}
    </>
  );
};

const AppCard: React.FC<{ app: AppData; onClick: () => void; variant?: 'default' | 'compact'; highlight?: string; downloadProgress?: number }> = ({ app, onClick, variant = 'default', highlight = '', downloadProgress }) => (
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
      {downloadProgress !== undefined && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-3">
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-1.5">
            <motion.div 
              className="h-full bg-aladeen-green"
              initial={{ width: 0 }}
              animate={{ width: `${downloadProgress}%` }}
            />
          </div>
          <span className="text-[10px] font-black text-white">{Math.floor(downloadProgress)}%</span>
        </div>
      )}
    </div>
    <div className={variant === 'compact' ? 'text-center' : ''}>
      <h3 className={`font-bold text-slate-900 truncate mb-0.5 ${variant === 'compact' ? 'text-xs' : 'text-sm'}`}>
        <HighlightedText text={app.name} highlight={highlight} />
      </h3>
      <p className="text-[10px] font-medium text-slate-400 truncate mb-2 uppercase tracking-wider">
        <HighlightedText text={app.developer} highlight={highlight} />
      </p>
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

const CategoryIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'ShoppingBag': return <ShoppingBag className="w-6 h-6" />;
    case 'Utensils': return <Utensils className="w-6 h-6" />;
    case 'Shirt': return <Shirt className="w-6 h-6" />;
    case 'Smartphone': return <Smartphone className="w-6 h-6" />;
    case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
    case 'Zap': return <Zap className="w-6 h-6" />;
    case 'Sparkles': return <Sparkles className="w-6 h-6" />;
    case 'Home': return <HomeIcon className="w-6 h-6" />;
    default: return <ShoppingBag className="w-6 h-6" />;
  }
};

const Section = ({ title, apps, onAppClick, onViewAll, icon: Icon, downloadingApps = {} }: { title: string; apps: AppData[]; onAppClick: (app: AppData) => void; onViewAll?: () => void; icon?: any; downloadingApps?: Record<string, number> }) => (
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
          <AppCard app={app} onClick={() => onAppClick(app)} downloadProgress={downloadingApps[app.id]} />
        </div>
      ))}
    </div>
  </div>
);

const AppDetail = ({ 
  app, 
  onBack, 
  isInstalled, 
  onInstall, 
  onUninstall,
  userReview,
  onRate,
  downloadProgress
}: { 
  app: AppData; 
  onBack: () => void; 
  isInstalled: boolean; 
  onInstall: () => void; 
  onUninstall: () => void; 
  userReview: { rating: number; comment: string } | null;
  onRate: (rating: number, comment: string) => void;
  downloadProgress?: number;
}) => {
  const isDownloading = downloadProgress !== undefined;
  const progress = downloadProgress || 0;
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showUninstallConfirm, setShowUninstallConfirm] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [tempRating, setTempRating] = useState(userReview?.rating || 0);
  const [comment, setComment] = useState(userReview?.comment || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: app.name,
      text: `Check out ${app.name} on aladeen.app!`,
      url: window.location.origin, // Since it's a SPA for now
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } else {
        // Fallback to clipboard
        const shareText = `${shareData.text} ${shareData.url}`;
        await navigator.clipboard.writeText(shareText);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        toast.error('Failed to share');
      }
    }
  };

  const handleDownload = () => {
    if (isInstalled) return;
    onInstall();
  };

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => setIsOpening(false), 2000);
  };

  const handleUninstall = () => {
    setShowUninstallConfirm(false);
    onUninstall();
  };

  const handleSubmitReview = () => {
    if (tempRating === 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
      onRate(tempRating, comment);
      setIsSubmitting(false);
    }, 800);
  };

  const displayReviews = useMemo(() => {
    if (userReview) {
      const userReviewObj = {
        id: 'user-review',
        userName: 'You',
        userImage: 'https://ui-avatars.com/api/?name=You&background=00ff87&color=fff',
        rating: userReview.rating,
        date: 'Just now',
        comment: userReview.comment
      };
      return [userReviewObj, ...app.reviews_list];
    }
    return app.reviews_list;
  }, [app.reviews_list, userReview]);

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
          <button onClick={handleShare} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
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
          <div className="flex flex-col gap-4">
            <button 
              onClick={isInstalled ? handleOpen : handleDownload}
              disabled={isDownloading || isOpening}
              className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
                isDownloading || isOpening
                  ? 'bg-slate-50 text-slate-400 cursor-not-allowed shadow-none' 
                  : 'bg-aladeen-green text-white hover:bg-aladeen-dark active:scale-[0.98] shadow-aladeen-green/20'
              }`}
            >
              {isDownloading ? (
                <span className="flex items-center gap-2">
                  <Download className="w-5 h-5 animate-bounce" />
                  Downloading...
                </span>
              ) : isOpening ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-slate-200 border-t-aladeen-green rounded-full animate-spin" />
                  Opening...
                </span>
              ) : isInstalled ? (
                <>
                  <ExternalLink className="w-5 h-5" />
                  Open
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Install
                </>
              )}
            </button>

            {isInstalled && !isDownloading && (
              <button 
                onClick={() => setShowUninstallConfirm(true)}
                className="w-full py-3 bg-slate-50 text-slate-400 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Uninstall App
              </button>
            )}

            {isDownloading && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="px-1"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Installation Progress</span>
                  <span className="text-sm font-black text-aladeen-green">{Math.floor(progress)}%</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-50">
                  <motion.div 
                    className="h-full bg-aladeen-green rounded-full shadow-[0_0_10px_rgba(0,255,135,0.3)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
                  />
                </div>
              </motion.div>
            )}
          </div>
          
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

        {/* Rating Section */}
        <div className="mb-10 p-6 bg-slate-50 rounded-3xl border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Rate this app</h2>
          <p className="text-slate-500 text-xs mb-6">Tell others what you think</p>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setTempRating(star)}
                    className="p-1 transition-transform active:scale-90"
                  >
                    <Star 
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoverRating || tempRating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-slate-300'
                      }`} 
                    />
                  </button>
                ))}
              </div>
              {tempRating > 0 && (
                <div className="text-aladeen-green font-bold text-sm bg-aladeen-green/10 px-3 py-1.5 rounded-full">
                  {tempRating}/5 Stars
                </div>
              )}
            </div>

            {tempRating > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex flex-col gap-4"
              >
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe your experience (optional)..."
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm text-slate-700 outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all min-h-[100px] resize-none"
                />
                <button
                  onClick={handleSubmitReview}
                  disabled={isSubmitting}
                  className="w-full py-3 bg-aladeen-green text-white rounded-xl font-bold text-sm shadow-lg shadow-aladeen-green/10 hover:bg-aladeen-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Submit Review'
                  )}
                </button>
              </motion.div>
            )}
          </div>
          
          {userReview && !isSubmitting && (
            <motion.p 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-xs text-aladeen-green font-bold flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Your review has been submitted!
            </motion.p>
          )}
        </div>

        {/* Reviews Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Ratings & Reviews</h2>
            <button className="text-aladeen-green font-bold text-sm">See all</button>
          </div>

          <div className="space-y-8">
            {displayReviews.map((review) => (
              <div key={review.id} className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-50">
                      <img 
                        src={review.userImage} 
                        alt={review.userName} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.userName)}&background=f1f5f9&color=64748b`;
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{review.userName}</h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-2.5 h-2.5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{review.date}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed pl-1">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpening && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full font-bold shadow-2xl z-[110] flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-aladeen-green animate-pulse" />
            Opening {app.name}...
          </motion.div>
        )}

        {showUninstallConfirm && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
            >
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900 text-center mb-2">Uninstall {app.name}?</h3>
              <p className="text-slate-500 text-center text-sm mb-8 leading-relaxed">
                Are you sure you want to uninstall this app? All data associated with it will be removed.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleUninstall}
                  className="w-full py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-all active:scale-[0.98]"
                >
                  Uninstall
                </button>
                <button 
                  onClick={() => setShowUninstallConfirm(false)}
                  className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-[0.98]"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

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

const CategoryDetail = ({ 
  category, 
  onBack, 
  onAppClick,
  downloadingApps = {}
}: { 
  category: CategoryData; 
  onBack: () => void; 
  onAppClick: (app: AppData) => void;
  downloadingApps?: Record<string, number>;
}) => {
  const relatedApps = useMemo(() => 
    MOCK_APPS.filter(app => app.category === category.name), 
    [category.name]
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed inset-0 bg-white z-50 overflow-y-auto"
    >
      <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 flex items-center px-6 py-4 border-b border-slate-50">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-700" />
        </button>
        <h1 className="ml-4 text-xl font-black text-slate-900">{category.name}</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-20 h-20 rounded-[2rem] bg-aladeen-green/10 text-aladeen-green flex items-center justify-center mb-6">
            <CategoryIcon icon={category.icon} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">{category.name}</h2>
          <p className="text-slate-500 max-w-lg leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Apps in this Category</h3>
            <span className="text-sm font-bold text-slate-400">{relatedApps.length} Apps</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {relatedApps.map(app => (
              <AppCard key={app.id} app={app} onClick={() => onAppClick(app)} downloadProgress={downloadingApps[app.id]} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const UserProfile = ({ 
  installedApps, 
  onAppClick, 
  onBack,
  downloadingApps = {}
}: { 
  installedApps: AppData[]; 
  onAppClick: (app: AppData) => void;
  onBack: () => void;
  downloadingApps?: Record<string, number>;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="px-6 py-8"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-aladeen-green transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold">Back to Home</span>
      </button>

      <div className="bg-slate-50 rounded-[2.5rem] p-8 mb-12 flex flex-col md:flex-row items-center gap-8 border border-slate-100">
        <div className="w-24 h-24 rounded-full bg-aladeen-green/10 flex items-center justify-center text-aladeen-green">
          <User className="w-12 h-12" />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-black text-slate-900 mb-1">Solyman Hossain</h2>
          <p className="text-slate-500 font-medium mb-4">hossainsolyman534@gmail.com</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Installed</span>
              <span className="text-lg font-black text-slate-900">{installedApps.length} Apps</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Member Since</span>
              <span className="text-lg font-black text-slate-900">March 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900">My Installed Apps</h3>
          <span className="text-sm font-bold text-slate-400">{installedApps.length} Apps</span>
        </div>

        {installedApps.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {installedApps.map(app => (
              <AppCard key={app.id} app={app} onClick={() => onAppClick(app)} downloadProgress={downloadingApps[app.id]} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Download className="w-8 h-8 text-slate-200" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">No apps installed yet</h4>
            <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2">
              Browse our collection and install your favorite shopping apps to see them here.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'home' | 'listing' | 'profile'>('home');
  const [selectedApp, setSelectedApp] = useState<AppData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryDetail, setSelectedCategoryDetail] = useState<CategoryData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [sortBy, setSortBy] = useState<'popular' | 'latest' | 'rating'>('popular');
  const [installedApps, setInstalledApps] = useState<string[]>(() => {
    const saved = localStorage.getItem('aladeen_installed');
    return saved ? JSON.parse(saved) : [];
  });
  const [downloadingApps, setDownloadingApps] = useState<Record<string, number>>({});
  const [userReviews, setUserReviews] = useState<Record<string, { rating: number; comment: string }>>(() => {
    const saved = localStorage.getItem('aladeen_reviews');
    return saved ? JSON.parse(saved) : {};
  });

  const handleInstall = (appId: string) => {
    const newInstalled = [...installedApps, appId];
    setInstalledApps(newInstalled);
    localStorage.setItem('aladeen_installed', JSON.stringify(newInstalled));
  };

  const startDownload = (appId: string) => {
    if (downloadingApps[appId] !== undefined || installedApps.includes(appId)) return;
    
    setDownloadingApps(prev => ({ ...prev, [appId]: 0 }));
    
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setDownloadingApps(prev => ({ ...prev, [appId]: 100 }));
        
        setTimeout(() => {
          setDownloadingApps(prev => {
            const next = { ...prev };
            delete next[appId];
            return next;
          });
          handleInstall(appId);
        }, 1000);
      } else {
        setDownloadingApps(prev => ({ ...prev, [appId]: p }));
      }
    }, 400);
  };

  const handleUninstall = (appId: string) => {
    const newInstalled = installedApps.filter(id => id !== appId);
    setInstalledApps(newInstalled);
    localStorage.setItem('aladeen_installed', JSON.stringify(newInstalled));
  };

  const handleRate = (appId: string, rating: number, comment: string) => {
    const newReviews = { ...userReviews, [appId]: { rating, comment } };
    setUserReviews(newReviews);
    localStorage.setItem('aladeen_reviews', JSON.stringify(newReviews));
  };

  const filteredApps = useMemo(() => {
    let apps = [...MOCK_APPS];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      apps = apps.filter(app => 
        app.name.toLowerCase().includes(query) ||
        app.developer.toLowerCase().includes(query) ||
        app.category.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query)
      );
    }
    if (selectedCategory) {
      apps = apps.filter(app => app.category === selectedCategory);
    }
    
    if (sortBy === 'popular') {
      apps.sort((a, b) => {
        if (a.isTrending && !b.isTrending) return -1;
        if (!a.isTrending && b.isTrending) return 1;
        return b.rating - a.rating;
      });
    } else if (sortBy === 'rating') {
      apps.sort((a, b) => b.rating - a.rating);
    } else {
      apps.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    }
    
    return apps;
  }, [searchQuery, selectedCategory, sortBy]);

  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    return MOCK_APPS
      .filter(app => 
        app.name.toLowerCase().includes(query) || 
        app.developer.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [searchQuery]);

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
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setView('profile')}
              className={`p-2 hover:bg-slate-50 rounded-xl transition-colors ${view === 'profile' ? 'text-aladeen-green bg-aladeen-green/5' : 'text-slate-700'}`}
              title="User Profile"
            >
              <User className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
              <Menu className="w-6 h-6 text-slate-700" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto pb-20">
        {view === 'profile' ? (
          <UserProfile 
            installedApps={MOCK_APPS.filter(app => installedApps.includes(app.id))}
            onAppClick={setSelectedApp}
            onBack={() => setView('home')}
            downloadingApps={downloadingApps}
          />
        ) : view === 'home' ? (
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
              
              <div className="relative max-w-xl mx-auto mb-12 z-30">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for apps (e.g. Daraz, Chaldal)" 
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all text-slate-700 shadow-sm"
                  value={searchQuery}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => {
                    setShowSuggestions(false);
                    setSelectedIndex(-1);
                  }, 200)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedIndex(-1);
                    if (e.target.value) {
                      setShowSuggestions(true);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setSelectedIndex(prev => (prev < suggestions.length ? prev + 1 : prev));
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      setSelectedIndex(prev => (prev > -1 ? prev - 1 : prev));
                    } else if (e.key === 'Enter') {
                      if (selectedIndex === -1) {
                        setView('listing');
                        setShowSuggestions(false);
                      } else if (selectedIndex === suggestions.length) {
                        setView('listing');
                        setShowSuggestions(false);
                      } else {
                        setSelectedApp(suggestions[selectedIndex]);
                        setShowSuggestions(false);
                      }
                    } else if (e.key === 'Escape') {
                      setShowSuggestions(false);
                      setSelectedIndex(-1);
                    }
                  }}
                />

                {searchQuery && (
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedIndex(-1);
                    }}
                    className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}

                <AnimatePresence>
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                    >
                      {suggestions.map((app, index) => (
                        <button
                          key={app.id}
                          onClick={() => {
                            setSelectedApp(app);
                            setShowSuggestions(false);
                          }}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`w-full flex items-center gap-4 p-4 transition-colors text-left border-b border-slate-50 last:border-0 ${
                            selectedIndex === index ? 'bg-slate-50' : 'hover:bg-slate-50'
                          }`}
                        >
                          <img src={app.icon} alt={app.name} className="w-10 h-10 rounded-xl object-cover" referrerPolicy="no-referrer" />
                          <div>
                            <div className="text-sm font-black text-slate-900">
                              <HighlightedText text={app.name} highlight={searchQuery} />
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              <HighlightedText text={app.developer} highlight={searchQuery} />
                            </div>
                          </div>
                          <div className="ml-auto flex items-center gap-1 text-aladeen-green">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-xs font-black">{app.rating}</span>
                          </div>
                        </button>
                      ))}
                      <button 
                        onClick={() => {
                          setView('listing');
                          setShowSuggestions(false);
                        }}
                        onMouseEnter={() => setSelectedIndex(suggestions.length)}
                        className={`w-full p-4 text-aladeen-green text-xs font-black uppercase tracking-widest transition-colors ${
                          selectedIndex === suggestions.length ? 'bg-slate-100' : 'bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        See all results for "{searchQuery}"
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 mb-12">
                {CATEGORIES.map(cat => (
                  <motion.div 
                    key={cat.name}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategoryDetail(cat)}
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-aladeen-green group-hover:text-white transition-all shadow-sm">
                      <CategoryIcon icon={cat.icon} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{cat.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Featured Category */}
            <div className="px-6 mb-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-aladeen-green rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-aladeen-green/20"
              >
                <div className="relative z-10 max-w-md">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                    <Sparkles className="w-3.5 h-3.5" />
                    Featured Category
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">Fresh Groceries, <br />Delivered Fast.</h2>
                  <p className="text-white/80 text-sm md:text-base mb-8 leading-relaxed">
                    Discover the best grocery apps in Bangladesh. From fresh produce to daily essentials, get everything delivered to your doorstep in minutes.
                  </p>
                  <button 
                    onClick={() => setSelectedCategoryDetail(CATEGORIES.find(c => c.name === 'Grocery') || null)}
                    className="bg-white text-aladeen-green px-8 py-4 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-xl"
                  >
                    Explore Grocery Apps
                  </button>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-96 h-96 bg-aladeen-dark/20 rounded-full blur-3xl" />
                <Utensils className="absolute bottom-[-20px] right-[-20px] w-64 h-64 text-white/5 -rotate-12" />
              </motion.div>
            </div>

            {/* Home Sections */}
            <Section 
              title="Featured Apps" 
              apps={featuredApps} 
              onAppClick={setSelectedApp} 
              onViewAll={() => setView('listing')}
              icon={Star} 
              downloadingApps={downloadingApps}
            />
            <Section 
              title="Recommended for You" 
              apps={recommendedApps} 
              onAppClick={setSelectedApp} 
              onViewAll={() => setView('listing')}
              icon={Sparkles} 
              downloadingApps={downloadingApps}
            />
            <Section 
              title="Trending Now" 
              apps={trendingApps} 
              onAppClick={setSelectedApp} 
              onViewAll={() => { setView('listing'); setSortBy('popular'); }}
              icon={TrendingUp} 
              downloadingApps={downloadingApps}
            />
            <Section 
              title="Newly Added" 
              apps={newlyAddedApps} 
              onAppClick={setSelectedApp} 
              onViewAll={() => { setView('listing'); setSortBy('latest'); }}
              icon={Plus} 
              downloadingApps={downloadingApps}
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
                    {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
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
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {filteredApps.map(app => (
                <AppCard 
                  key={app.id} 
                  app={app} 
                  onClick={() => setSelectedApp(app)} 
                  highlight={searchQuery} 
                  downloadProgress={downloadingApps[app.id]}
                />
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
            isInstalled={installedApps.includes(selectedApp.id)}
            onInstall={() => startDownload(selectedApp.id)}
            onUninstall={() => handleUninstall(selectedApp.id)}
            userReview={userReviews[selectedApp.id] || null}
            onRate={(rating, comment) => handleRate(selectedApp.id, rating, comment)}
            downloadProgress={downloadingApps[selectedApp.id]}
          />
        )}
      </AnimatePresence>

      {/* Category Detail Overlay */}
      <AnimatePresence>
        {selectedCategoryDetail && (
          <CategoryDetail 
            category={selectedCategoryDetail}
            onBack={() => setSelectedCategoryDetail(null)}
            onAppClick={(app) => {
              setSelectedCategoryDetail(null);
              setSelectedApp(app);
            }}
            downloadingApps={downloadingApps}
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
      <Toaster position="bottom-center" richColors />
    </div>
  );
}
