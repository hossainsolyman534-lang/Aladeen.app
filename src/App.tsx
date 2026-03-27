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
  User,
  Heart,
  Settings,
  PlusCircle,
  Edit,
  Save,
  Layout,
  FileText,
  Image as ImageIcon,
  Check,
  Upload,
  GraduationCap,
  Briefcase,
  Gamepad2,
  BarChart3,
  Users,
  Activity,
  Phone,
  Lock,
  LogOut,
  Globe,
  Facebook,
  Calendar,
  Play,
  Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_APPS, AppData, CATEGORIES, MOCK_REVIEWS, CategoryData, ClientData, MOCK_CLIENTS } from './constants';

// --- Components ---

const AuthModal = ({ 
  isOpen, 
  onClose, 
  onLogin 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onLogin: (user: any) => void 
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Admin Login Check
    if (isLogin && formData.email === 'hossainsolyman534@gmail.com' && formData.password === '87654321') {
      const adminUser = {
        name: 'Admin',
        email: 'hossainsolyman534@gmail.com',
        role: 'admin'
      };
      onLogin(adminUser);
      toast.success('Welcome back, Admin!');
      onClose();
      return;
    }

    if (isLogin) {
      // Regular User Login (Simulated)
      if (!formData.phone || !formData.password) {
        toast.error('Please fill in all fields');
        return;
      }
      const user = {
        name: 'User',
        phone: formData.phone,
        role: 'user'
      };
      onLogin(user);
      toast.success('Logged in successfully!');
    } else {
      // Regular User Signup (Simulated)
      if (!formData.name || !formData.phone || !formData.password) {
        toast.error('Please fill in all fields');
        return;
      }
      const user = {
        name: formData.name,
        phone: formData.phone,
        role: 'user'
      };
      onLogin(user);
      toast.success('Account created successfully!');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Email (for Admin)</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all"
                  placeholder="01XXXXXXXXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-aladeen-green text-white rounded-2xl font-bold text-lg shadow-lg shadow-aladeen-green/20 hover:bg-aladeen-dark transition-all active:scale-[0.98] mt-4"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-bold text-slate-500 hover:text-aladeen-green transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

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

const AppCard: React.FC<{ app: AppData; onClick: () => void; variant?: 'default' | 'compact'; highlight?: string; downloadProgress?: number }> = ({ app, onClick, variant = 'default', highlight = '', downloadProgress }) => {
  const isExpired = app.expiryDate ? new Date(app.expiryDate) < new Date() : false;

  return (
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
        {isExpired && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center p-2">
            <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
              <Calendar className="w-3 h-3 text-rose-500" />
              <span className="text-[8px] font-black text-rose-600 uppercase tracking-widest">Expired</span>
            </div>
          </div>
        )}
      </div>
    <div className={variant === 'compact' ? 'text-center' : ''}>
      <h3 className={`font-bold text-slate-900 truncate mb-0.5 ${variant === 'compact' ? 'text-xs' : 'text-sm'}`}>
        <HighlightedText text={app.name} highlight={highlight} />
      </h3>
      <p className="text-[10px] font-medium text-slate-400 truncate mb-1 uppercase tracking-wider">
        <HighlightedText text={app.developer} highlight={highlight} />
      </p>
      {variant !== 'compact' && (
        <p className="text-[10px] text-slate-500 line-clamp-2 mb-2 leading-tight min-h-[2.5em]">
          {app.shortDescription}
        </p>
      )}
      
      {downloadProgress !== undefined ? (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[8px] font-black text-aladeen-green uppercase tracking-widest animate-pulse">Installing</span>
            <span className="text-[9px] font-black text-aladeen-green">{Math.floor(downloadProgress)}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-50 shadow-inner">
            <motion.div 
              className="h-full bg-aladeen-green rounded-full shadow-[0_0_10px_rgba(0,255,135,0.3)]"
              initial={{ width: 0 }}
              animate={{ width: `${downloadProgress}%` }}
              transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
            />
          </div>
        </motion.div>
      ) : (
        <div className={`flex items-center gap-1.5 ${variant === 'compact' ? 'justify-center' : ''}`}>
          <div className="flex items-center gap-0.5 bg-slate-50 px-1.5 py-0.5 rounded-md">
            <span className="text-[10px] font-black text-slate-700">{app.rating}</span>
            <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
          </div>
          <span className="text-[10px] font-bold text-slate-300 ml-auto">{app.size}</span>
        </div>
      )}
    </div>
  </motion.div>
  );
};

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
    case 'GraduationCap': return <GraduationCap className="w-6 h-6" />;
    case 'Briefcase': return <Briefcase className="w-6 h-6" />;
    case 'Gamepad2': return <Gamepad2 className="w-6 h-6" />;
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
  onAppClick,
  apps,
  downloadProgress,
  isWishlisted,
  onToggleWishlist
}: { 
  app: AppData; 
  onBack: () => void; 
  isInstalled: boolean; 
  onInstall: () => void; 
  onUninstall: () => void; 
  userReview: { rating: number; comment: string } | null;
  onRate: (rating: number, comment: string) => void;
  onAppClick: (app: AppData) => void;
  apps: AppData[];
  downloadProgress?: number;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
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

  const isExpired = app.expiryDate ? new Date(app.expiryDate) < new Date() : false;

  const handleDownload = () => {
    if (isExpired) {
      toast.error("This app has expired and cannot be downloaded.");
      return;
    }
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
      id="app-detail-container"
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
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist();
              }}
              className={`p-2 hover:bg-slate-50 rounded-full transition-colors ${isWishlisted ? 'text-rose-500' : 'text-slate-700'}`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
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
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">{app.name}</h1>
              {app.isVerified && (
                <div className="bg-aladeen-green/10 p-1 rounded-full" title="Verified APK">
                  <CheckCircle2 className="w-4 h-4 text-aladeen-green" />
                </div>
              )}
            </div>
            <p className="text-aladeen-green font-semibold text-sm mb-1">{app.developer}</p>
            <p className="text-slate-500 text-xs mb-3 font-medium leading-relaxed">{app.shortDescription}</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
                <span className="text-xs font-bold text-slate-700">{app.rating}</span>
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              </div>
              <span className="text-xs text-slate-400">{app.reviews} reviews</span>
              
              {userReview && (
                <div className="flex items-center gap-1 bg-aladeen-green/10 px-2 py-1 rounded-lg">
                  <span className="text-[10px] font-bold text-aladeen-green uppercase tracking-wider">Your Rating</span>
                  <div className="flex items-center gap-0.5 ml-1">
                    <span className="text-xs font-bold text-aladeen-green">{userReview.rating}</span>
                    <Star className="w-2.5 h-2.5 fill-aladeen-green text-aladeen-green" />
                  </div>
                </div>
              )}
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
            {isExpired && (
              <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3 mb-2">
                <div className="bg-rose-100 p-2 rounded-xl">
                  <Calendar className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-rose-600">App Expired</div>
                  <div className="text-[10px] text-rose-400 font-medium">This app reached its expiry date on {app.expiryDate}</div>
                </div>
              </div>
            )}
            <button 
              onClick={isInstalled ? handleOpen : handleDownload}
              disabled={isDownloading || isOpening || (isExpired && !isInstalled)}
              className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
                isDownloading || isOpening || (isExpired && !isInstalled)
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

            <button 
              onClick={onToggleWishlist}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border ${
                isWishlisted 
                  ? 'bg-rose-50 text-rose-500 border-rose-100 hover:bg-rose-100' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
            </button>

            <button 
              onClick={handleShare}
              className="w-full py-3 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share App
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

        {app.promoVideo && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-aladeen-green" />
              Promo Video
            </h2>
            <div className="aspect-video w-full rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-900 relative group">
              {app.promoVideo.includes('youtube.com') || app.promoVideo.includes('youtu.be') ? (
                <iframe 
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${
                    app.promoVideo.includes('v=') 
                      ? app.promoVideo.split('v=')[1].split('&')[0] 
                      : app.promoVideo.split('/').pop()
                  }`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white gap-4 p-6 text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-10 h-10 fill-white ml-1" />
                  </div>
                  <a 
                    href={app.promoVideo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-bold hover:underline"
                  >
                    Watch Promo Video
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

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
          
          {isInstalled ? (
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
          ) : (
            <div className="text-center py-4">
              <p className="text-slate-500 text-sm mb-4">You need to install this app to leave a review.</p>
              <button 
                onClick={onInstall}
                className="text-aladeen-green font-bold text-sm hover:underline"
              >
                Install now
              </button>
            </div>
          )}
          
          {userReview && !isSubmitting && isInstalled && (
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

        {/* Related Apps Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Related Apps</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {apps
              .filter(a => a.id !== app.id && (a.category === app.category || a.developer === app.developer))
              .slice(0, 4)
              .map(relatedApp => (
                <AppCard 
                  key={relatedApp.id} 
                  app={relatedApp} 
                  onClick={() => {
                    onAppClick(relatedApp);
                    // Scroll to top when switching apps
                    const container = document.getElementById('app-detail-container');
                    if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                />
              ))
            }
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
  apps,
  downloadingApps = {}
}: { 
  category: CategoryData; 
  onBack: () => void; 
  onAppClick: (app: AppData) => void;
  apps: AppData[];
  downloadingApps?: Record<string, number>;
}) => {
  const relatedApps = useMemo(() => 
    apps.filter(app => app.category === category.name), 
    [category.name, apps]
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed inset-0 bg-white z-50 overflow-y-auto"
    >
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img 
          src={category.banner} 
          alt={category.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <button 
          onClick={onBack} 
          className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full text-white transition-all shadow-lg z-20"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="absolute bottom-8 left-8 z-20">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-xl">
              <CategoryIcon icon={category.icon} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white drop-shadow-lg">{category.name}</h1>
              <p className="text-white/80 text-sm font-medium mt-1 drop-shadow-md">Explore the best {category.name.toLowerCase()} apps</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-16">
          <h2 className="text-xl font-bold text-slate-900 mb-4">About {category.name}</h2>
          <p className="text-slate-500 max-w-2xl leading-relaxed text-lg">
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
  wishlistApps, 
  onAppClick, 
  onBack,
  onAdminClick,
  downloadingApps = {},
  currentUser,
  onLogout,
  onLoginClick
}: { 
  installedApps: AppData[]; 
  wishlistApps: AppData[]; 
  onAppClick: (app: AppData) => void; 
  onBack: () => void;
  onAdminClick: () => void;
  downloadingApps?: Record<string, number>;
  currentUser: any;
  onLogout: () => void;
  onLoginClick: () => void;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="px-6 py-10"
    >
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">User <span className="text-aladeen-green">Profile</span></h1>
        </div>
        {currentUser && (
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-red-500 font-bold text-sm hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        )}
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 mb-10">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-aladeen-green/10 flex items-center justify-center text-aladeen-green border-4 border-white shadow-lg">
            <User className="w-12 h-12" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">{currentUser ? currentUser.name : 'Guest User'}</h2>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">
              {currentUser ? (currentUser.role === 'admin' ? 'Administrator' : 'Regular User') : 'Not Logged In'}
            </p>
            {currentUser?.phone && <p className="text-slate-500 text-sm mt-1">{currentUser.phone}</p>}
            {currentUser?.email && <p className="text-slate-500 text-sm mt-1">{currentUser.email}</p>}
          </div>
        </div>

        {!currentUser && (
          <button 
            onClick={onLoginClick}
            className="w-full mt-8 py-4 bg-aladeen-green text-white rounded-2xl font-bold text-lg shadow-lg shadow-aladeen-green/20 hover:bg-aladeen-dark transition-all active:scale-[0.98]"
          >
            Login or Create Account
          </button>
        )}

        {currentUser?.role === 'admin' && (
          <div className="mt-8 pt-8 border-t border-slate-50">
            <button 
              onClick={onAdminClick}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <BarChart3 className="w-6 h-6 text-aladeen-green" />
              Access Admin Dashboard
            </button>
          </div>
        )}
      </div>

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

      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900">My Wishlist</h3>
          <span className="text-sm font-bold text-slate-400">{wishlistApps.length} Apps</span>
        </div>

        {wishlistApps.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {wishlistApps.map(app => (
              <AppCard key={app.id} app={app} onClick={() => onAppClick(app)} downloadProgress={downloadingApps[app.id]} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Heart className="w-8 h-8 text-slate-200" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Your wishlist is empty</h4>
            <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2">
              Save apps you're interested in to keep track of them here.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const AdminDashboard = ({ 
  apps, 
  onAddApp, 
  onUpdateApp, 
  onDeleteApp, 
  clients,
  onAddClient,
  onUpdateClient,
  onDeleteClient,
  onBack 
}: { 
  apps: AppData[]; 
  onAddApp: (app: AppData) => void; 
  onUpdateApp: (app: AppData) => void; 
  onDeleteApp: (appId: string) => void; 
  clients: ClientData[];
  onAddClient: (client: ClientData) => void;
  onUpdateClient: (client: ClientData) => void;
  onDeleteClient: (clientId: string) => void;
  onBack: () => void; 
}) => {
  const [activeTab, setActiveTab] = useState<'manage' | 'analytics' | 'clients'>('manage');
  const [isAdding, setIsAdding] = useState(false);
  const [editingApp, setEditingApp] = useState<AppData | null>(null);
  
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientData | null>(null);
  const [clientSortOrder, setClientSortOrder] = useState<'asc' | 'desc'>('desc');
  const [clientFormData, setClientFormData] = useState<Partial<ClientData>>({
    name: '',
    onBoardDate: new Date().toISOString().split('T')[0],
    website: '',
    facebook: '',
    contactNumber: '',
    notes: ''
  });

  const [uploadingApk, setUploadingApk] = useState(false);
  const [apkProgress, setApkProgress] = useState(0);
  const [formData, setFormData] = useState<Partial<AppData>>({
    name: '',
    developer: '',
    category: CATEGORIES[0].name,
    rating: 4.5,
    reviews: '0',
    downloads: '0',
    size: '0 MB',
    icon: 'https://picsum.photos/seed/app/200/200',
    banner: 'https://picsum.photos/seed/banner/800/400',
    shortDescription: '',
    description: '',
    screenshots: ['https://picsum.photos/seed/s1/400/800', 'https://picsum.photos/seed/s2/400/800', 'https://picsum.photos/seed/s3/400/800'],
    promoVideo: '',
    isVerified: true,
    isFeatured: false,
    isTrending: false,
    addedAt: new Date().toISOString(),
    reviews_list: [],
    apkUrl: '',
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
  });

  const stats = useMemo(() => {
    const totalDownloads = apps.reduce((acc, app) => {
      const d = parseInt(app.downloads.replace(/[^0-9]/g, '')) || 0;
      const multiplier = app.downloads.includes('M') ? 1000000 : app.downloads.includes('K') ? 1000 : 1;
      return acc + (d * multiplier);
    }, 0);

    const totalReviews = apps.reduce((acc, app) => {
      const r = parseInt(app.reviews.replace(/[^0-9]/g, '')) || 0;
      const multiplier = app.reviews.includes('M') ? 1000000 : app.reviews.includes('K') ? 1000 : 1;
      return acc + (r * multiplier);
    }, 0);

    return {
      totalApps: apps.length,
      totalDownloads: totalDownloads >= 1000000 ? `${(totalDownloads / 1000000).toFixed(1)}M` : totalDownloads >= 1000 ? `${(totalDownloads / 1000).toFixed(1)}K` : totalDownloads,
      totalReviews: totalReviews >= 1000000 ? `${(totalReviews / 1000000).toFixed(1)}M` : totalReviews >= 1000 ? `${(totalReviews / 1000).toFixed(1)}K` : totalReviews,
      avgRating: apps.length > 0 ? (apps.reduce((acc, app) => acc + app.rating, 0) / apps.length).toFixed(1) : '0.0'
    };
  }, [apps]);

  const sortedClients = useMemo(() => {
    return [...clients].sort((a, b) => {
      const dateA = new Date(a.onBoardDate).getTime();
      const dateB = new Date(b.onBoardDate).getTime();
      return clientSortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [clients, clientSortOrder]);

  const handleApkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.apk')) {
      toast.error('Please select a valid APK file');
      return;
    }

    setUploadingApk(true);
    setApkProgress(0);

    // Simulate upload
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 20;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setUploadingApk(false);
        setFormData(prev => ({ ...prev, apkUrl: `https://aladeen.app/downloads/${file.name}`, size: `${(file.size / (1024 * 1024)).toFixed(1)} MB` }));
        toast.success('APK uploaded successfully!');
      }
      setApkProgress(p);
    }, 300);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      developer: '',
      category: CATEGORIES[0].name,
      rating: 4.5,
      reviews: '0',
      downloads: '0',
      size: '0 MB',
      icon: 'https://picsum.photos/seed/app/200/200',
      banner: 'https://picsum.photos/seed/banner/800/400',
      shortDescription: '',
      description: '',
      screenshots: ['https://picsum.photos/seed/s1/400/800', 'https://picsum.photos/seed/s2/400/800', 'https://picsum.photos/seed/s3/400/800'],
      promoVideo: '',
      isVerified: true,
      isFeatured: false,
      isTrending: false,
      addedAt: new Date().toISOString(),
      reviews_list: [],
      apkUrl: '',
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
    });
    setEditingApp(null);
    setIsAdding(false);
  };

  const resetClientForm = () => {
    setClientFormData({
      name: '',
      onBoardDate: new Date().toISOString().split('T')[0],
      website: '',
      facebook: '',
      contactNumber: '',
      notes: ''
    });
    setEditingClient(null);
    setIsAddingClient(false);
  };

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClient) {
      onUpdateClient({ ...editingClient, ...clientFormData } as ClientData);
    } else {
      const newClient: ClientData = {
        ...clientFormData,
        id: `client-${Date.now()}`
      } as ClientData;
      onAddClient(newClient);
    }
    resetClientForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate expiry date
    if (formData.expiryDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(formData.expiryDate);
      if (selectedDate <= today) {
        toast.error('Expiry date must be in the future (tomorrow or later)');
        return;
      }
    }

    if (editingApp) {
      onUpdateApp({ ...editingApp, ...formData } as AppData);
    } else {
      const newApp: AppData = {
        ...formData,
        id: `app-${Date.now()}`,
        addedAt: new Date().toISOString(),
        reviews_list: []
      } as AppData;
      onAddApp(newApp);
    }
    resetForm();
  };

  const handleEdit = (app: AppData) => {
    setEditingApp(app);
    setFormData(app);
    setIsAdding(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
              <ArrowLeft className="w-6 h-6 text-slate-700" />
            </button>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin <span className="text-aladeen-green">Dashboard</span></h1>
              <div className="flex items-center gap-4 mt-2">
                <button 
                  onClick={() => setActiveTab('manage')}
                  className={`text-sm font-bold transition-colors ${activeTab === 'manage' ? 'text-aladeen-green' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Manage Apps
                </button>
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className={`text-sm font-bold transition-colors ${activeTab === 'analytics' ? 'text-aladeen-green' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Analytics
                </button>
                <button 
                  onClick={() => setActiveTab('clients')}
                  className={`text-sm font-bold transition-colors ${activeTab === 'clients' ? 'text-aladeen-green' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Clients
                </button>
              </div>
            </div>
          </div>
          {!isAdding && !isAddingClient && activeTab === 'manage' && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 bg-aladeen-green text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-aladeen-green/20 hover:bg-aladeen-dark transition-all active:scale-95"
            >
              <PlusCircle className="w-5 h-5" />
              Publish New APK
            </button>
          )}
          {!isAdding && !isAddingClient && activeTab === 'clients' && (
            <button 
              onClick={() => setIsAddingClient(true)}
              className="flex items-center gap-2 bg-aladeen-green text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-aladeen-green/20 hover:bg-aladeen-dark transition-all active:scale-95"
            >
              <PlusCircle className="w-5 h-5" />
              Add New Client
            </button>
          )}
        </div>

        {activeTab === 'analytics' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-4">
                <LayoutGrid className="w-6 h-6" />
              </div>
              <div className="text-2xl font-black text-slate-900">{stats.totalApps}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Total Apps</div>
            </div>
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-aladeen-green/10 rounded-2xl flex items-center justify-center text-aladeen-green mb-4">
                <Download className="w-6 h-6" />
              </div>
              <div className="text-2xl font-black text-slate-900">{stats.totalDownloads}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Total Downloads</div>
            </div>
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-500 mb-4">
                <Star className="w-6 h-6" />
              </div>
              <div className="text-2xl font-black text-slate-900">{stats.avgRating}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Avg Rating</div>
            </div>
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-2xl font-black text-slate-900">{stats.totalReviews}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Total Reviews</div>
            </div>
          </div>
        ) : isAdding ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900">{editingApp ? 'Edit Application' : 'Publish New Application'}</h2>
              <button 
                onClick={resetForm}
                className="p-2 hover:bg-slate-50 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">App Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all"
                    placeholder="e.g. Daraz Shopping"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Developer</label>
                  <input 
                    required
                    type="text" 
                    value={formData.developer}
                    onChange={e => setFormData({...formData, developer: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all"
                    placeholder="e.g. Daraz Mobile"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Category</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all"
                    >
                      {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Expiry Date</label>
                    <input 
                      required
                      type="date" 
                      min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
                      value={formData.expiryDate}
                      onChange={e => setFormData({...formData, expiryDate: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Size</label>
                  <input 
                    type="text" 
                    value={formData.size}
                    onChange={e => setFormData({...formData, size: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all"
                    placeholder="e.g. 45 MB"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Short Description (Max 80 chars)</label>
                  <input 
                    required
                    type="text" 
                    maxLength={80}
                    value={formData.shortDescription}
                    onChange={e => setFormData({...formData, shortDescription: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all"
                    placeholder="Brief summary of the app..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Full Description</label>
                  <textarea 
                    required
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all min-h-[120px] resize-none"
                    placeholder="Tell users about this app..."
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">App Icon (512×512 px)</label>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                      <img src={formData.icon} alt="preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <input 
                      type="text" 
                      value={formData.icon}
                      onChange={e => setFormData({...formData, icon: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all"
                      placeholder="Icon URL"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Feature Graphic (1024×500 px)</label>
                  <input 
                    type="text" 
                    value={formData.banner}
                    onChange={e => setFormData({...formData, banner: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all"
                    placeholder="Feature Graphic URL"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Promo Video URL (Optional)</label>
                  <input 
                    type="text" 
                    value={formData.promoVideo}
                    onChange={e => setFormData({...formData, promoVideo: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all"
                    placeholder="YouTube Video ID or URL"
                  />
                  {formData.promoVideo && (
                    <div className="mt-4 aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-900">
                      {formData.promoVideo.includes('youtube.com') || formData.promoVideo.includes('youtu.be') ? (
                        <iframe 
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${
                            formData.promoVideo.includes('v=') 
                              ? formData.promoVideo.split('v=')[1].split('&')[0] 
                              : formData.promoVideo.split('/').pop()
                          }`}
                          title="YouTube video player preview"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold p-4 text-center">
                          External Video Link: {formData.promoVideo}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Mobile Preview Images (Screenshots)</label>
                  <div className="space-y-2">
                    {formData.screenshots?.map((s, i) => (
                      <div key={i} className="flex gap-2">
                        <input 
                          type="text" 
                          value={s}
                          onChange={e => {
                            const newScreenshots = [...(formData.screenshots || [])];
                            newScreenshots[i] = e.target.value;
                            setFormData({...formData, screenshots: newScreenshots});
                          }}
                          className="flex-1 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all text-sm"
                          placeholder={`Screenshot ${i + 1} URL`}
                        />
                        <button 
                          type="button"
                          onClick={() => {
                            const newScreenshots = (formData.screenshots || []).filter((_, index) => index !== i);
                            setFormData({...formData, screenshots: newScreenshots});
                          }}
                          className="p-2 hover:bg-red-50 text-red-500 rounded-xl transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, screenshots: [...(formData.screenshots || []), `https://picsum.photos/seed/s${(formData.screenshots?.length || 0) + 1}/400/800`]})}
                      className="text-xs font-bold text-aladeen-green hover:underline"
                    >
                      + Add Screenshot
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <input 
                      type="checkbox" 
                      id="isVerified"
                      checked={formData.isVerified}
                      onChange={e => setFormData({...formData, isVerified: e.target.checked})}
                      className="w-5 h-5 accent-aladeen-green"
                    />
                    <label htmlFor="isVerified" className="text-sm font-bold text-slate-700 cursor-pointer">Verified App</label>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <input 
                      type="checkbox" 
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onChange={e => setFormData({...formData, isFeatured: e.target.checked})}
                      className="w-5 h-5 accent-aladeen-green"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-bold text-slate-700 cursor-pointer">Featured</label>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <input 
                    type="checkbox" 
                    id="isTrending"
                    checked={formData.isTrending}
                    onChange={e => setFormData({...formData, isTrending: e.target.checked})}
                    className="w-5 h-5 accent-aladeen-green"
                  />
                  <label htmlFor="isTrending" className="text-sm font-bold text-slate-700 cursor-pointer">Trending Now</label>
                </div>

                <div className="p-6 bg-aladeen-green/5 rounded-[2rem] border border-aladeen-green/10">
                  <label className="block text-xs font-black text-aladeen-green uppercase tracking-widest mb-4">APK File</label>
                  
                  {formData.apkUrl ? (
                    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-aladeen-green/20 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-aladeen-green/10 rounded-xl flex items-center justify-center text-aladeen-green">
                          <Check className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 truncate max-w-[150px]">
                            {formData.apkUrl.split('/').pop()}
                          </div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{formData.size}</div>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, apkUrl: '' }))}
                        className="text-xs font-bold text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : uploadingApk ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-aladeen-green uppercase tracking-widest animate-pulse">Uploading APK...</span>
                        <span className="text-xs font-black text-aladeen-green">{Math.floor(apkProgress)}%</span>
                      </div>
                      <div className="h-2 w-full bg-aladeen-green/10 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-aladeen-green"
                          initial={{ width: 0 }}
                          animate={{ width: `${apkProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-aladeen-green/30 rounded-[2rem] cursor-pointer hover:bg-aladeen-green/5 transition-all group">
                      <Upload className="w-8 h-8 text-aladeen-green mb-3 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-bold text-slate-700">Select APK File</span>
                      <span className="text-[10px] text-slate-400 mt-1">Maximum size: 100MB</span>
                      <input 
                        type="file" 
                        accept=".apk"
                        onChange={handleApkUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                
                <div className="pt-4 flex gap-4">
                  <button 
                    type="submit"
                    className="flex-1 bg-aladeen-green text-white py-4 rounded-2xl font-black shadow-lg shadow-aladeen-green/20 hover:bg-aladeen-dark transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {editingApp ? 'Update App' : 'Publish App'}
                  </button>
                  <button 
                    type="button"
                    onClick={resetForm}
                    className="px-8 bg-slate-100 text-slate-600 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        ) : activeTab === 'clients' ? (
          isAddingClient ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-900">{editingClient ? 'Edit Client' : 'Add New Client'}</h2>
                <button 
                  onClick={resetClientForm}
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleClientSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Client Name</label>
                    <input 
                      required
                      type="text" 
                      value={clientFormData.name}
                      onChange={e => setClientFormData({...clientFormData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all"
                      placeholder="e.g. Daraz Bangladesh"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">On-board Date</label>
                    <input 
                      required
                      type="date" 
                      value={clientFormData.onBoardDate}
                      onChange={e => setClientFormData({...clientFormData, onBoardDate: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Contact Number</label>
                    <input 
                      required
                      type="text" 
                      value={clientFormData.contactNumber}
                      onChange={e => setClientFormData({...clientFormData, contactNumber: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all"
                      placeholder="e.g. +8801234567890"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Website URL</label>
                    <input 
                      type="text" 
                      value={clientFormData.website}
                      onChange={e => setClientFormData({...clientFormData, website: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Facebook Page URL</label>
                    <input 
                      type="text" 
                      value={clientFormData.facebook}
                      onChange={e => setClientFormData({...clientFormData, facebook: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all"
                      placeholder="https://facebook.com/example"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Notes</label>
                    <textarea 
                      value={clientFormData.notes}
                      onChange={e => setClientFormData({...clientFormData, notes: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-aladeen-green/20 focus:border-aladeen-green transition-all min-h-[100px] resize-none"
                      placeholder="Any additional info..."
                    />
                  </div>
                </div>

                <div className="md:col-span-2 pt-4 flex gap-4">
                  <button 
                    type="submit"
                    className="flex-1 bg-aladeen-green text-white py-4 rounded-2xl font-black shadow-lg shadow-aladeen-green/20 hover:bg-aladeen-dark transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {editingClient ? 'Update Client' : 'Add Client'}
                  </button>
                  <button 
                    type="button"
                    onClick={resetClientForm}
                    className="px-8 bg-slate-100 text-slate-600 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Client Name</th>
                      <th 
                        className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-aladeen-green transition-colors"
                        onClick={() => setClientSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                      >
                        <div className="flex items-center gap-2">
                          On-board Date
                          <ArrowUpDown className={`w-3 h-3 ${clientSortOrder === 'desc' ? 'text-aladeen-green' : 'text-slate-300'}`} />
                        </div>
                      </th>
                      <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Website Link</th>
                      <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Facebook Link</th>
                      <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Contact Number</th>
                      <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {sortedClients.map(client => (
                      <tr key={client.id} className="hover:bg-slate-50/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">{client.name}</div>
                          {client.notes && <div className="text-[10px] text-slate-400 truncate max-w-[200px]">{client.notes}</div>}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-slate-600 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            {client.onBoardDate}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {client.website ? (
                            <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-blue-500 hover:underline flex items-center gap-2">
                              <Globe className="w-4 h-4" />
                              Website
                            </a>
                          ) : (
                            <span className="text-xs text-slate-300">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {client.facebook ? (
                            <a href={client.facebook} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-indigo-500 hover:underline flex items-center gap-2">
                              <Facebook className="w-4 h-4" />
                              Facebook
                            </a>
                          ) : (
                            <span className="text-xs text-slate-300">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-slate-600 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-slate-400" />
                            {client.contactNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => {
                                setEditingClient(client);
                                setClientFormData(client);
                                setIsAddingClient(true);
                              }}
                              className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => {
                                toast.custom((t) => (
                                  <div className="bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 max-w-sm">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Remove Client?</h3>
                                    <p className="text-sm text-slate-500 mb-6">Are you sure you want to remove <span className="font-bold text-slate-900">{client.name}</span>?</p>
                                    <div className="flex gap-3">
                                      <button 
                                        onClick={() => {
                                          onDeleteClient(client.id);
                                          toast.dismiss(t);
                                        }}
                                        className="flex-1 bg-red-500 text-white py-2 rounded-xl font-bold hover:bg-red-600 transition-colors"
                                      >
                                        Remove
                                      </button>
                                      <button 
                                        onClick={() => toast.dismiss(t)}
                                        className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-xl font-bold hover:bg-slate-200 transition-all"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ));
                              }}
                              className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ) : activeTab === 'analytics' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl">
              <div className="w-12 h-12 bg-aladeen-green/10 rounded-2xl flex items-center justify-center text-aladeen-green mb-6">
                <Layout className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">{stats.totalApps}</div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Apps</div>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                <Download className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">{stats.totalDownloads}</div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Downloads</div>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl">
              <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-500 mb-6">
                <Star className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">{stats.avgRating}</div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Avg Rating</div>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">{clients.length}</div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Clients</div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">App</th>
                    <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Stats</th>
                    <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {apps.map(app => (
                    <tr key={app.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={app.icon} alt="" className="w-12 h-12 rounded-xl object-cover shadow-sm" referrerPolicy="no-referrer" />
                          <div>
                            <div className="font-bold text-slate-900">{app.name}</div>
                            <div className="text-xs text-slate-400 font-medium">{app.developer}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-600 uppercase tracking-wider">
                          <Layout className="w-3 h-3" />
                          {app.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            {app.rating}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <Download className="w-3 h-3" />
                            {app.downloads}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {app.isVerified && <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[9px] font-black uppercase tracking-widest rounded-md border border-green-100">Verified</span>}
                          {app.isFeatured && <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-md border border-blue-100">Featured</span>}
                          {app.isTrending && <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[9px] font-black uppercase tracking-widest rounded-md border border-orange-100">Trending</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleEdit(app)}
                            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                            title="Edit App"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => {
                              toast.custom((t) => (
                                <div className="bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 max-w-sm">
                                  <h3 className="text-lg font-bold text-slate-900 mb-2">Delete App?</h3>
                                  <p className="text-sm text-slate-500 mb-6">Are you sure you want to delete <span className="font-bold text-slate-900">{app.name}</span>? This action cannot be undone.</p>
                                  <div className="flex gap-3">
                                    <button 
                                      onClick={() => {
                                        onDeleteApp(app.id);
                                        toast.dismiss(t);
                                      }}
                                      className="flex-1 bg-red-500 text-white py-2 rounded-xl font-bold hover:bg-red-600 transition-colors"
                                    >
                                      Delete
                                    </button>
                                    <button 
                                      onClick={() => toast.dismiss(t)}
                                      className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ));
                            }}
                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                            title="Delete App"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [allApps, setAllApps] = useState<AppData[]>(() => {
    const saved = localStorage.getItem('aladeen_all_apps');
    return saved ? JSON.parse(saved) : MOCK_APPS;
  });

  const [currentUser, setCurrentUser] = useState<any>(() => {
    const saved = localStorage.getItem('aladeen_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [view, setView] = useState<'home' | 'listing' | 'profile' | 'admin'>('home');

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    localStorage.setItem('aladeen_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('aladeen_user');
    setView('home');
    toast.success('Logged out successfully');
  };

  const handleAddApp = (newApp: AppData) => {
    const updatedApps = [newApp, ...allApps];
    setAllApps(updatedApps);
    localStorage.setItem('aladeen_all_apps', JSON.stringify(updatedApps));
    toast.success('App published successfully!');
  };

  const handleUpdateApp = (updatedApp: AppData) => {
    const updatedApps = allApps.map(app => app.id === updatedApp.id ? updatedApp : app);
    setAllApps(updatedApps);
    localStorage.setItem('aladeen_all_apps', JSON.stringify(updatedApps));
    toast.success('App updated successfully!');
  };

  const handleDeleteApp = (appId: string) => {
    const updatedApps = allApps.filter(app => app.id !== appId);
    setAllApps(updatedApps);
    localStorage.setItem('aladeen_all_apps', JSON.stringify(updatedApps));
    toast.success('App deleted successfully!');
  };

  const [allClients, setAllClients] = useState<ClientData[]>(() => {
    const saved = localStorage.getItem('aladeen_clients');
    return saved ? JSON.parse(saved) : MOCK_CLIENTS;
  });

  const handleAddClient = (newClient: ClientData) => {
    const updated = [newClient, ...allClients];
    setAllClients(updated);
    localStorage.setItem('aladeen_clients', JSON.stringify(updated));
    toast.success('Client added successfully!');
  };

  const handleUpdateClient = (updatedClient: ClientData) => {
    const updated = allClients.map(c => c.id === updatedClient.id ? updatedClient : c);
    setAllClients(updated);
    localStorage.setItem('aladeen_clients', JSON.stringify(updated));
    toast.success('Client updated successfully!');
  };

  const handleDeleteClient = (clientId: string) => {
    const updated = allClients.filter(c => c.id !== clientId);
    setAllClients(updated);
    localStorage.setItem('aladeen_clients', JSON.stringify(updated));
    toast.success('Client removed successfully!');
  };
  const [selectedApp, setSelectedApp] = useState<AppData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryDetail, setSelectedCategoryDetail] = useState<CategoryData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [sortBy, setSortBy] = useState<'popular' | 'latest' | 'rating' | 'downloads'>('popular');
  const [installedApps, setInstalledApps] = useState<string[]>(() => {
    const saved = localStorage.getItem('aladeen_installed');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('aladeen_wishlist');
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

  const toggleWishlist = (appId: string) => {
    const newWishlist = wishlist.includes(appId)
      ? wishlist.filter(id => id !== appId)
      : [...wishlist, appId];
    setWishlist(newWishlist);
    localStorage.setItem('aladeen_wishlist', JSON.stringify(newWishlist));
    
    if (newWishlist.includes(appId)) {
      toast.success('Added to wishlist');
    } else {
      toast.info('Removed from wishlist');
    }
  };

  const startDownload = (appId: string) => {
    if (downloadingApps[appId] !== undefined || installedApps.includes(appId)) return;
    
    const app = allApps.find(a => a.id === appId);
    if (app?.apkUrl) {
      toast.info(`Downloading APK: ${app.name}...`);
    } else {
      toast.info(`Installing ${app?.name || 'app'}...`);
    }

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

  const parseDownloads = (downloads: string): number => {
    const clean = downloads.replace('+', '').toLowerCase();
    if (clean.endsWith('m')) return parseFloat(clean) * 1000000;
    if (clean.endsWith('k')) return parseFloat(clean) * 1000;
    return parseFloat(clean) || 0;
  };

  const filteredApps = useMemo(() => {
    let apps = [...allApps];
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
    } else if (sortBy === 'downloads') {
      apps.sort((a, b) => parseDownloads(b.downloads) - parseDownloads(a.downloads));
    } else {
      apps.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    }
    
    return apps;
  }, [searchQuery, selectedCategory, sortBy, allApps]);

  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    return allApps
      .filter(app => 
        app.name.toLowerCase().includes(query) || 
        app.developer.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [searchQuery, allApps]);

  const featuredApps = useMemo(() => allApps.filter(a => a.isFeatured), [allApps]);
  const trendingApps = useMemo(() => allApps.filter(a => a.isTrending), [allApps]);
  const newlyAddedApps = useMemo(() => [...allApps].sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, 4), [allApps]);
  
  const recommendedApps = useMemo(() => {
    return [...allApps]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  }, [allApps]);

  if (view === 'admin') {
    return (
      <AdminDashboard 
        apps={allApps}
        onAddApp={handleAddApp}
        onUpdateApp={handleUpdateApp}
        onDeleteApp={handleDeleteApp}
        clients={allClients}
        onAddClient={handleAddClient}
        onUpdateClient={handleUpdateClient}
        onDeleteClient={handleDeleteClient}
        onBack={() => setView('home')}
      />
    );
  }

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
              onClick={() => currentUser ? setView('profile') : setIsAuthModalOpen(true)}
              className={`p-2 hover:bg-slate-50 rounded-xl transition-colors ${view === 'profile' ? 'text-aladeen-green bg-aladeen-green/5' : 'text-slate-700'}`}
              title={currentUser ? "User Profile" : "Login"}
            >
              {currentUser ? <User className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
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
            installedApps={allApps.filter(app => installedApps.includes(app.id))}
            wishlistApps={allApps.filter(app => wishlist.includes(app.id))}
            onAppClick={setSelectedApp}
            onBack={() => setView('home')}
            onAdminClick={() => setView('admin')}
            downloadingApps={downloadingApps}
            currentUser={currentUser}
            onLogout={handleLogout}
            onLoginClick={() => setIsAuthModalOpen(true)}
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
                    <option value="downloads">Downloads</option>
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
            onAppClick={setSelectedApp}
            apps={allApps}
            isInstalled={installedApps.includes(selectedApp.id)}
            onInstall={() => {
              if (!currentUser) {
                setIsAuthModalOpen(true);
                toast.info('Please login to download apps');
                return;
              }
              startDownload(selectedApp.id);
            }}
            onUninstall={() => handleUninstall(selectedApp.id)}
            userReview={userReviews[selectedApp.id] || null}
            onRate={(rating, comment) => {
              if (!currentUser) {
                setIsAuthModalOpen(true);
                toast.info('Please login to leave a review');
                return;
              }
              handleRate(selectedApp.id, rating, comment);
            }}
            downloadProgress={downloadingApps[selectedApp.id]}
            isWishlisted={wishlist.includes(selectedApp.id)}
            onToggleWishlist={() => toggleWishlist(selectedApp.id)}
          />
        )}
      </AnimatePresence>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin} 
      />

      {/* Category Detail Overlay */}
      <AnimatePresence>
        {selectedCategoryDetail && (
          <CategoryDetail 
            category={selectedCategoryDetail}
            onBack={() => setSelectedCategoryDetail(null)}
            apps={allApps}
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
};
