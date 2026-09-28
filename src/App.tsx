import React, { useState, useEffect, useMemo } from 'react';
import { 
  INITIAL_ARTWORKS, 
  ARTIST_LINH_DAN, 
  MOCK_ARTISTS,
  INITIAL_OWNED_ARTWORKS, 
  INITIAL_COMMISSIONS,
  heroExhibitionImg,
  artistAvatarLinhImg
} from './data/mockData';
import { 
  Artwork, 
  Category, 
  ArtStyle, 
  LicenseType, 
  PriceRange,
  User, 
  OwnedArtwork, 
  CommissionOrder, 
  CommissionStep,
  ArtistProfile
} from './types';

import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { ArtworkCard } from './components/ArtworkCard';
import { ArtworkDetailModal } from './components/ArtworkDetailModal';
import { AuthModal } from './components/AuthModal';
import { CreatorStudio } from './components/CreatorStudio';
import { DashboardHub } from './components/DashboardHub';
import { ArtistProfileModal } from './components/ArtistProfileModal';
import { CertificateModal } from './components/CertificateModal';
import { CheckoutEscrowModal } from './components/CheckoutEscrowModal';
import { WishlistModal } from './components/WishlistModal';
import { Toast, ToastMessage } from './components/Toast';

import { Shield, Sparkles, Heart, FileCheck, Layers, Award, RotateCcw } from 'lucide-react';

export default function App() {
  // User Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('artfair_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    // Default logged in as demo buyer with youth micro-budget
    return {
      id: 'usr-buyer-88',
      name: 'Nguyễn Trần Hải (Gen Z Creator/Buyer)',
      email: 'tran.hai.collector@artfair.gallery',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      role: 'buyer',
      balance: 500000, // 500.000 ₫
      isVerified: true,
    };
  });

  // Artworks State (Youth POD & Daily Decor Edition)
  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    const saved = localStorage.getItem('artfair_artworks_youth_v1');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 10) return parsed;
      } catch (e) { /* ignore */ }
    }
    return INITIAL_ARTWORKS;
  });

  // Owned Artworks State
  const [ownedArtworks, setOwnedArtworks] = useState<OwnedArtwork[]>(() => {
    const saved = localStorage.getItem('artfair_owned_youth_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_OWNED_ARTWORKS;
  });

  // Commissions State
  const [commissions, setCommissions] = useState<CommissionOrder[]>(() => {
    const saved = localStorage.getItem('artfair_commissions_youth_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_COMMISSIONS;
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('artfair_wishlist_youth_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return ['art-stk-01', 'art-app-01', 'art-wsh-01'];
  });

  // Active Screen
  const [activeScreen, setActiveScreen] = useState<'discovery' | 'dashboard' | 'studio'>('discovery');
  const [dashboardTab, setDashboardTab] = useState<'collector' | 'creator'>('collector');

  // Modals
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [checkoutData, setCheckoutData] = useState<{ artwork: Artwork; license: LicenseType } | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<OwnedArtwork | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authInitialRole, setAuthInitialRole] = useState<'buyer' | 'creator'>('buyer');
  const [authIntentText, setAuthIntentText] = useState<string | undefined>(undefined);
  const [showCreatorStudio, setShowCreatorStudio] = useState(false);
  const [showArtistProfile, setShowArtistProfile] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<ArtistProfile>(MOCK_ARTISTS[0]);
  const [showWishlistModal, setShowWishlistModal] = useState(false);

  // Helper to open specific artist profile
  const handleOpenArtist = (artistId?: string) => {
    if (artistId) {
      const found = MOCK_ARTISTS.find((a) => a.id === artistId);
      if (found) {
        setSelectedArtist(found);
      } else {
        setSelectedArtist(MOCK_ARTISTS[0]);
      }
    } else {
      setSelectedArtist(MOCK_ARTISTS[0]);
    }
    setShowArtistProfile(true);
  };

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Tất cả');
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle>('Tất cả');
  const [selectedLicense, setSelectedLicense] = useState<'all' | 'personal' | 'commercial'>('all');
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'sold'>('all');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'info' | 'success' | 'warning', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('artfair_artworks_youth_v1', JSON.stringify(artworks));
  }, [artworks]);

  useEffect(() => {
    localStorage.setItem('artfair_owned_youth_v1', JSON.stringify(ownedArtworks));
  }, [ownedArtworks]);

  useEffect(() => {
    localStorage.setItem('artfair_commissions_youth_v1', JSON.stringify(commissions));
  }, [commissions]);

  useEffect(() => {
    localStorage.setItem('artfair_wishlist_youth_v1', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('artfair_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('artfair_user');
    }
  }, [currentUser]);

  // Reset all filters handler
  const handleResetAllFilters = () => {
    setSelectedCategory('Tất cả');
    setSelectedStyle('Tất cả');
    setSelectedLicense('all');
    setPriceRange('all');
    setStatusFilter('all');
    setSearchQuery('');
    addToast('info', 'Đã đặt lại bộ lọc', 'Hiển thị toàn bộ các tác phẩm trên sàn triển lãm ARTFAIR.');
  };

  // Wishlist handler
  const handleToggleWishlist = (artwork: Artwork) => {
    if (!currentUser) {
      setAuthInitialRole('buyer');
      setAuthIntentText('lưu tác phẩm vào Danh sách yêu thích');
      setShowAuthModal(true);
      return;
    }

    const isExist = wishlist.includes(artwork.id);
    if (isExist) {
      setWishlist(wishlist.filter((id) => id !== artwork.id));
      addToast('info', 'Đã bỏ yêu thích', `Đã xóa "${artwork.title}" khỏi danh sách yêu thích.`);
    } else {
      setWishlist([...wishlist, artwork.id]);
      addToast('success', 'Đã thêm vào yêu thích', `Đã lưu "${artwork.title}" vào bộ sưu tập quan tâm.`);
    }
  };

  // Watermark Warning Toast
  const handleWatermarkWarning = () => {
    addToast(
      'warning',
      'Bản quyền ARTFAIR được bảo hộ',
      'Chặn tải hình ảnh trực tiếp. Vui lòng thanh toán bản quyền để nhận file gốc 300 DPI và giấy chứng nhận có giá trị pháp lý.'
    );
  };

  // Buy Now Flow
  const handleBuyNow = (artwork: Artwork, license: LicenseType) => {
    if (!currentUser) {
      setAuthInitialRole('buyer');
      setAuthIntentText(`mua bản quyền tác phẩm "${artwork.title}"`);
      setShowAuthModal(true);
      return;
    }
    setSelectedArtwork(null);
    setCheckoutData({ artwork, license });
  };

  // Payment Success
  const handlePaymentSuccess = (purchased: OwnedArtwork) => {
    setOwnedArtworks([purchased, ...ownedArtworks]);

    // Deduct user balance or update state
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        balance: Math.max(0, currentUser.balance - purchased.pricePaid),
      });
    }

    // Update remaining edition
    setArtworks((prev) =>
      prev.map((art) => {
        if (art.id === purchased.artworkId) {
          const remaining = (art.editionRemaining ?? 1) - 1;
          return {
            ...art,
            editionRemaining: Math.max(0, remaining),
            isSoldOut: remaining <= 0,
          };
        }
        return art;
      })
    );

    addToast(
      'success',
      'Giao dịch Ký Quỹ Escrow Thành Công!',
      `Bạn đã sở hữu bản quyền tác phẩm "${purchased.artworkTitle}". Tệp gốc 300DPI và Chứng nhận số đã sẵn sàng trong Collector Hub.`
    );

    // Open Certificate modal immediately for gratification
    setSelectedCertificate(purchased);
  };

  // Commission Submission
  const handleCommissionSubmit = (commission: CommissionOrder) => {
    setCommissions([commission, ...commissions]);
    setActiveScreen('dashboard');
    setDashboardTab('collector');
    addToast(
      'success',
      'Đã kích hoạt Escrow cho đơn Commission',
      `Mã đơn ${commission.id} đã khởi tạo thành công. Nghệ sĩ sẽ phản hồi phác thảo ý tưởng.`
    );
  };

  // Update Commission Stepper
  const handleUpdateCommissionStep = (orderId: string, nextStep: CommissionStep) => {
    setCommissions((prev) =>
      prev.map((c) => (c.id === orderId ? { ...c, currentStep: nextStep } : c))
    );
    addToast(
      'success',
      'Cập nhật tiến độ thành công',
      `Đơn Commission ${orderId} đã chuyển sang bước tiếp theo trên hệ thống ký quỹ.`
    );
  };

  // Publish New Artwork from Creator Studio
  const handlePublishArtwork = (newArt: Artwork) => {
    setArtworks([newArt, ...artworks]);
    setActiveScreen('discovery');
    addToast(
      'success',
      'Đăng bán tác phẩm thành công!',
      `Tác phẩm "${newArt.title}" đã được niêm yết trên phòng tranh trực tuyến ARTFAIR.`
    );
  };

  // Soft Filtering Logic (Prevents Empty State & Offers Smart Fallback Suggestions)
  const { displayArtworks, isSoftFiltered, relaxedReasons } = useMemo(() => {
    // 1. Strict Filter Matching
    const strict = artworks.filter((art) => {
      // Category filter
      if (selectedCategory !== 'Tất cả' && art.category !== selectedCategory) {
        return false;
      }
      // Style filter
      if (selectedStyle !== 'Tất cả' && art.style !== selectedStyle) {
        return false;
      }
      // Price range filter (Youth micro-pricing: 30k - 500k)
      if (priceRange === 'under50k' && art.personalPrice >= 50000) return false;
      if (priceRange === '50k-150k' && (art.personalPrice < 50000 || art.personalPrice > 150000)) return false;
      if (priceRange === 'above150k' && art.personalPrice < 150000) return false;
      // Status filter
      if (statusFilter === 'available' && art.isSoldOut) return false;
      if (statusFilter === 'sold' && !art.isSoldOut) return false;
      // Search query (checking title, artist, description, category, style, tags)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = art.title.toLowerCase().includes(q);
        const matchArtist = art.artistName.toLowerCase().includes(q);
        const matchDesc = art.description.toLowerCase().includes(q);
        const matchCategory = art.category.toLowerCase().includes(q);
        const matchStyle = art.style.toLowerCase().includes(q);
        const matchTags = art.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchArtist && !matchDesc && !matchCategory && !matchStyle && !matchTags) {
          return false;
        }
      }
      return true;
    });

    if (strict.length > 0) {
      return { displayArtworks: strict, isSoftFiltered: false, relaxedReasons: [] };
    }

    // 2. Soft Filtering Fallback (Relaxing restrictive criteria gracefully)
    let relaxed: Artwork[] = [];
    const reasons: string[] = [];

    // Attempt A: Relax price/style/status but keep category
    if (selectedCategory !== 'Tất cả') {
      const byCat = artworks.filter((a) => a.category === selectedCategory);
      if (byCat.length > 0) {
        relaxed = byCat;
        reasons.push(`danh mục "${selectedCategory}"`);
      }
    }

    // Attempt B: If still empty, try matching style
    if (relaxed.length === 0 && selectedStyle !== 'Tất cả') {
      const byStyle = artworks.filter((a) => a.style === selectedStyle);
      if (byStyle.length > 0) {
        relaxed = byStyle;
        reasons.push(`phong cách "${selectedStyle}"`);
      }
    }

    // Attempt C: If search query, try token matching
    if (relaxed.length === 0 && searchQuery.trim()) {
      const qTokens = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
      const byTokens = artworks.filter((a) => {
        return qTokens.some(
          (t) =>
            a.title.toLowerCase().includes(t) ||
            a.artistName.toLowerCase().includes(t) ||
            a.category.toLowerCase().includes(t) ||
            a.style.toLowerCase().includes(t) ||
            a.tags?.some((tag) => tag.toLowerCase().includes(t))
        );
      });
      if (byTokens.length > 0) {
        relaxed = byTokens;
        reasons.push(`từ khóa liên quan`);
      }
    }

    // Attempt D: If price range was strict, show works close to that price bracket
    if (relaxed.length === 0 && priceRange !== 'all') {
      const byPrice = artworks.filter((art) => {
        if (priceRange === 'under50k') return art.personalPrice < 80000;
        if (priceRange === '50k-150k') return art.personalPrice >= 30000 && art.personalPrice <= 200000;
        if (priceRange === 'above150k') return art.personalPrice >= 100000;
        return true;
      });
      if (byPrice.length > 0) {
        relaxed = byPrice;
        reasons.push(`mức giá gần nhất`);
      }
    }

    // Fallback: Default to curated artworks so screen is never blank
    if (relaxed.length === 0) {
      relaxed = [...artworks].sort((a, b) => b.likes - a.likes).slice(0, 9);
      reasons.push('bộ sưu tập nghệ thuật tiêu biểu');
    }

    return { displayArtworks: relaxed, isSoftFiltered: true, relaxedReasons: reasons };
  }, [artworks, selectedCategory, selectedStyle, priceRange, statusFilter, searchQuery]);

  const wishlistedArtworks = useMemo(() => {
    return artworks.filter((a) => wishlist.includes(a.id));
  }, [artworks, wishlist]);

  return (
    <div className="min-h-screen bg-[#FAF6F2] text-[#683B2B] flex flex-col font-sans selection:bg-[#D49E8D]/30 selection:text-[#683B2B]">
      
      {/* 1. STICKY TOP NAVBAR */}
      <Navbar
        currentUser={currentUser}
        onOpenAuth={(role) => {
          setAuthInitialRole(role || 'buyer');
          setAuthIntentText(undefined);
          setShowAuthModal(true);
        }}
        onLogout={() => {
          setCurrentUser(null);
          addToast('info', 'Đã đăng xuất', 'Bạn đang trải nghiệm ARTFAIR dưới quyền khách vãng lai.');
        }}
        onOpenStudio={() => {
          if (!currentUser) {
            setAuthInitialRole('creator');
            setAuthIntentText('đăng bán tác phẩm trên sàn');
            setShowAuthModal(true);
          } else {
            setShowCreatorStudio(true);
          }
        }}
        onOpenDashboard={(tab) => {
          if (!currentUser) {
            setAuthInitialRole('buyer');
            setAuthIntentText('truy cập bộ sưu tập và tiến độ');
            setShowAuthModal(true);
          } else {
            setDashboardTab(tab || 'collector');
            setActiveScreen('dashboard');
          }
        }}
        onOpenArtistProfile={() => handleOpenArtist('artist-001')}
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setShowWishlistModal(true)}
        allArtworks={artworks}
        allArtists={MOCK_ARTISTS}
        onSelectArtwork={(art) => setSelectedArtwork(art)}
        onSelectArtist={(artistId) => handleOpenArtist(artistId)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveScreen('discovery');
        }}
      />

      {/* MAIN VIEW SWITCHER */}
      <main className="flex-1">
        {activeScreen === 'discovery' && (
          <div>
            {/* HERO BANNER */}
            <HeroBanner
              onExploreGallery={() => {
                const el = document.getElementById('gallery-feed');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenCommission={() => handleOpenArtist('artist-001')}
              onOpenArtistProfile={() => handleOpenArtist('artist-001')}
            />

            {/* ADVANCED FILTER BAR */}
            <div id="gallery-feed">
              <FilterBar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedStyle={selectedStyle}
                onSelectStyle={setSelectedStyle}
                selectedLicense={selectedLicense}
                onSelectLicense={setSelectedLicense}
                priceRange={priceRange}
                onSelectPriceRange={setPriceRange}
                statusFilter={statusFilter}
                onSelectStatus={setStatusFilter}
                totalCount={displayArtworks.length}
                onResetFilters={handleResetAllFilters}
                isSoftFiltered={isSoftFiltered}
              />
            </div>

            {/* ARTWORK MASONRY GRID & SOFT FILTER NOTIFICATION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
              
              {/* Soft Filter Notification Banner (Never leaves user with empty blank screen) */}
              {isSoftFiltered && (
                <div className="mb-8 p-4 sm:p-5 bg-gradient-to-r from-amber-50/90 to-[#FAF6F2] border border-[#B08401]/30 rounded-2xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#B08401]/10 border border-[#B08401]/30 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-[#B08401]" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm sm:text-base font-semibold text-[#683B2B]">
                        Không tìm thấy chính xác, có thể bạn sẽ thích các tác phẩm nghệ thuật tương tự:
                      </h4>
                      <p className="text-xs text-[#683B2B]/75 mt-0.5">
                        Hệ thống đã tự động gợi ý các tác phẩm liên quan gần nhất thuộc{' '}
                        <span className="font-semibold text-[#B08401]">{relaxedReasons.join(' & ')}</span> để bạn không bỏ lỡ cảm hứng.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleResetAllFilters}
                    className="px-4 py-2 bg-white hover:bg-[#FAF6F2] border border-[#DED1BD] rounded-xl text-xs font-semibold text-[#B08401] hover:text-[#683B2B] transition-colors shrink-0 shadow-2xs cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Đặt lại bộ lọc</span>
                  </button>
                </div>
              )}

              {/* Grid of Artworks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
                {displayArtworks.map((art) => (
                  <ArtworkCard
                    key={art.id}
                    artwork={art}
                    onSelect={(artwork) => setSelectedArtwork(artwork)}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlist.includes(art.id)}
                    onArtistClick={(artistId) => handleOpenArtist(artistId || art.artistId)}
                    onWatermarkToast={handleWatermarkWarning}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* DASHBOARD & HUB */}
        {activeScreen === 'dashboard' && (
          <DashboardHub
            currentUser={currentUser}
            initialTab={dashboardTab}
            ownedArtworks={ownedArtworks}
            commissions={commissions}
            onOpenCertificate={(owned) => setSelectedCertificate(owned)}
            onUpdateCommissionStep={handleUpdateCommissionStep}
            onOpenStudio={() => setShowCreatorStudio(true)}
            userArtworks={artworks.filter((a) => a.artistId === 'artist-001')}
            onRequireAuth={() => {
              setAuthInitialRole('buyer');
              setShowAuthModal(true);
            }}
          />
        )}
      </main>

      {/* CURATORIAL FOOTER */}
      <footer className="bg-[#FAF6F2] border-t border-[#DED1BD] mt-16 text-xs text-[#683B2B]/75 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <span className="font-serif text-xl font-bold text-[#683B2B]">ARTFAIR</span>
              <p className="leading-relaxed">
                Nền tảng triển lãm nghệ thuật số, giao dịch bản quyền tác phẩm độc quyền và kết nối vẽ commission chuyên nghiệp với cơ chế ký quỹ Escrow bảo hộ 100%.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-[#B08401] font-semibold">
                <Shield className="w-4 h-4" />
                <span>Bảo chứng bản quyền số hóa chuẩn quốc tế</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-sm font-bold text-[#683B2B] uppercase tracking-wider">
                Về ARTFAIR
              </h4>
              <ul className="space-y-1.5">
                <li><a href="#" className="hover:text-[#B08401] transition-colors">Tầm nhìn & Giám tuyển</a></li>
                <li><a href="#" className="hover:text-[#B08401] transition-colors">Tiêu chuẩn File gốc 300 DPI</a></li>
                <li><a href="#" className="hover:text-[#B08401] transition-colors">Cơ chế Ký quỹ Escrow</a></li>
                <li><a href="#" className="hover:text-[#B08401] transition-colors">Quy định Chống tải trộm tranh</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-sm font-bold text-[#683B2B] uppercase tracking-wider">
                Dành Cho Nghệ Sĩ
              </h4>
              <ul className="space-y-1.5">
                <li>
                  <button 
                    onClick={() => {
                      if (!currentUser) { setAuthInitialRole('creator'); setShowAuthModal(true); }
                      else { setShowCreatorStudio(true); }
                    }}
                    className="hover:text-[#B08401] transition-colors text-left cursor-pointer"
                  >
                    Đăng bán tác phẩm mới
                  </button>
                </li>
                <li><a href="#" className="hover:text-[#B08401] transition-colors">Thiết lập bản quyền Thương mại</a></li>
                <li><a href="#" className="hover:text-[#B08401] transition-colors">Nhận đơn đặt vẽ Commission</a></li>
                <li><a href="#" className="hover:text-[#B08401] transition-colors">Chính sách thanh toán & Rút tiền</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-sm font-bold text-[#683B2B] uppercase tracking-wider">
                Đặc Quyền Bản Quyền
              </h4>
              <div className="p-3 bg-white/70 border border-[#DED1BD] rounded-xl space-y-1.5">
                <span className="font-bold text-[#683B2B] block">👤 Gói Bản Quyền Cá Nhân</span>
                <p className="text-[11px] leading-tight">In ấn trang trí nhà cửa, avatar cá nhân.</p>
                <span className="font-bold text-[#683B2B] block pt-1">🏢 Gói Bản Quyền Thương Mại</span>
                <p className="text-[11px] leading-tight">In áo thun, bao bì, sách, sản phẩm thương mại.</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#DED1BD]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#683B2B]/60">
            <p>© 2026 ARTFAIR Foundation. Bảo lưu mọi quyền bản quyền nghệ thuật.</p>
            <div className="flex gap-4">
              <span>Điều khoản dịch vụ</span>
              <span>Chính sách quyền riêng tư</span>
              <span>Giấy phép cấp quyền Creative Commons & Escrow</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Artwork Detail & Interactive Mockup Studio Modal */}
      <ArtworkDetailModal
        artwork={selectedArtwork}
        isOpen={!!selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        onBuyNow={handleBuyNow}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedArtwork ? wishlist.includes(selectedArtwork.id) : false}
        onArtistClick={(artistId) => {
          setSelectedArtwork(null);
          handleOpenArtist(artistId || selectedArtwork?.artistId);
        }}
      />

      {/* 2. Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          addToast('success', 'Đăng nhập thành công', `Chào mừng ${user.name} đến với ARTFAIR.`);
        }}
        initialRole={authInitialRole}
        intentActionText={authIntentText}
      />

      {/* 3. Creator Studio Modal */}
      <CreatorStudio
        isOpen={showCreatorStudio}
        onClose={() => setShowCreatorStudio(false)}
        onPublishArtwork={handlePublishArtwork}
        creatorName={currentUser?.name}
        creatorAvatar={currentUser?.avatar}
      />

      {/* 4. Artist Profile & Commission Modal */}
      <ArtistProfileModal
        artist={selectedArtist}
        isOpen={showArtistProfile}
        onClose={() => setShowArtistProfile(false)}
        artworks={artworks}
        onSelectArtwork={(artwork) => setSelectedArtwork(artwork)}
        onCommissionSubmit={handleCommissionSubmit}
        currentUser={currentUser}
        onRequireAuth={() => {
          setShowArtistProfile(false);
          setAuthInitialRole('buyer');
          setAuthIntentText('gửi yêu cầu đặt vẽ Commission');
          setShowAuthModal(true);
        }}
      />

      {/* 5. Certificate of Authenticity Modal */}
      <CertificateModal
        artwork={selectedCertificate}
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
        buyerName={currentUser?.name || 'Nguyễn Trần Hải'}
      />

      {/* 6. Checkout & Escrow Modal */}
      <CheckoutEscrowModal
        artwork={checkoutData?.artwork || null}
        licenseType={checkoutData?.license || 'personal'}
        isOpen={!!checkoutData}
        onClose={() => setCheckoutData(null)}
        currentUser={currentUser}
        onPaymentSuccess={handlePaymentSuccess}
        onRequireAuth={() => {
          setCheckoutData(null);
          setAuthInitialRole('buyer');
          setAuthIntentText('hoàn tất thanh toán bản quyền tác phẩm');
          setShowAuthModal(true);
        }}
      />

      {/* 7. Wishlist Modal */}
      <WishlistModal
        isOpen={showWishlistModal}
        onClose={() => setShowWishlistModal(false)}
        wishlistArtworks={wishlistedArtworks}
        onSelectArtwork={(art) => setSelectedArtwork(art)}
        onRemoveFromWishlist={handleToggleWishlist}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />

    </div>
  );
}
