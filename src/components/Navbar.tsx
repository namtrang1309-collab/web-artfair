import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Upload, 
  ShieldCheck, 
  Heart, 
  LogOut, 
  Sparkles, 
  X, 
  Tag, 
  Palette, 
  UserCheck,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { User as UserType, Artwork, ArtistProfile, Category } from '../types';

interface NavbarProps {
  currentUser: UserType | null;
  onOpenAuth: (role?: 'buyer' | 'creator') => void;
  onLogout: () => void;
  onOpenStudio: () => void;
  onOpenDashboard: (tab?: 'collector' | 'creator') => void;
  onOpenArtistProfile: () => void;
  activeScreen: string;
  setActiveScreen: (screen: 'discovery' | 'dashboard' | 'studio') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  allArtworks?: Artwork[];
  allArtists?: ArtistProfile[];
  onSelectArtwork?: (artwork: Artwork) => void;
  onSelectArtist?: (artistId: string) => void;
  onSelectCategory?: (category: Category) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenStudio,
  onOpenDashboard,
  onOpenArtistProfile,
  activeScreen,
  setActiveScreen,
  searchQuery,
  setSearchQuery,
  wishlistCount,
  onOpenWishlist,
  allArtworks = [],
  allArtists = [],
  onSelectArtwork,
  onSelectArtist,
  onSelectCategory,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute live search suggestions across 3 groups
  const trimmedQuery = searchQuery.trim().toLowerCase();

  const suggestedArtworks = trimmedQuery
    ? allArtworks
        .filter((art) => {
          return (
            art.title.toLowerCase().includes(trimmedQuery) ||
            art.artistName.toLowerCase().includes(trimmedQuery) ||
            art.category.toLowerCase().includes(trimmedQuery) ||
            art.style.toLowerCase().includes(trimmedQuery) ||
            (art.tags && art.tags.some((t) => t.toLowerCase().includes(trimmedQuery)))
          );
        })
        .slice(0, 4)
    : [];

  const suggestedArtists = trimmedQuery
    ? allArtists
        .filter((artist) => {
          return (
            artist.name.toLowerCase().includes(trimmedQuery) ||
            artist.pseudonym.toLowerCase().includes(trimmedQuery) ||
            artist.bio.toLowerCase().includes(trimmedQuery)
          );
        })
        .slice(0, 3)
    : [];

  const allCategories: Category[] = [
    'Sticker & Decal',
    'Áo thun & Apparel',
    'Logo & Brand Identity',
    'Washi Tape & Stationery',
    'Phone Case & Phụ kiện',
    'Poster & Decor',
  ];

  const suggestedCategories = trimmedQuery
    ? allCategories.filter((cat) => cat.toLowerCase().includes(trimmedQuery))
    : [];

  // Trending search terms for zero-query autocomplete
  const trendingSearches = [
    { label: 'Sticker Anime Chibi', type: 'category', value: 'Sticker & Decal' },
    { label: 'Áo thun Y2K Oversize', type: 'category', value: 'Áo thun & Apparel' },
    { label: 'Washi Tape Mèo Cam', type: 'category', value: 'Washi Tape & Stationery' },
    { label: 'Logo Tiệm Bánh Nhỏ', type: 'category', value: 'Logo & Brand Identity' },
    { label: 'Ốp Lưng Cá Koi', type: 'category', value: 'Phone Case & Phụ kiện' },
    { label: 'Hà My (Mèo Cam)', type: 'artist', value: 'artist-001' },
    { label: 'Vũ Long Streetwear', type: 'artist', value: 'artist-002' },
    { label: 'Poster Lofi Decor', type: 'category', value: 'Poster & Decor' },
  ];

  const hasSuggestions =
    suggestedArtworks.length > 0 ||
    suggestedArtists.length > 0 ||
    suggestedCategories.length > 0;

  const notifications = [
    {
      id: 1,
      title: 'Ký quỹ Escrow an toàn',
      desc: 'Khoản tiền 8.500.000 ₫ cho đơn Commission #CMS-042 đang được bảo hộ tại ARTFAIR.',
      time: '10 phút trước',
      read: false,
    },
    {
      id: 2,
      title: 'Họa sĩ Linh Đan đã cập nhật bản vẽ',
      desc: 'Bản phối màu mới cho tác phẩm của bạn đã sẵn sàng duyệt.',
      time: '2 giờ trước',
      read: false,
    },
    {
      id: 3,
      title: 'Chứng nhận bản quyền điện tử',
      desc: 'Mã hash 0x7F9B1E4A đã được ghi nhận trên sổ cái nghệ thuật.',
      time: '1 ngày trước',
      read: true,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F2]/95 backdrop-blur-md border-b border-[#DED1BD]">
      {/* Main Bar with Clear Zone Separation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Zone 1: Logo with minimalist art sphere and refined serif wordmark */}
        <button
          onClick={() => {
            setActiveScreen('discovery');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left group flex items-center gap-2.5 shrink-0 cursor-pointer focus:outline-none"
        >
          {/* Minimalist Art Sphere / Globe Icon */}
          <div className="relative w-8 h-8 rounded-full border border-[#B08401] flex items-center justify-center bg-[#FAF6F2] shadow-xs group-hover:border-[#683B2B] transition-colors">
            <div className="w-5 h-5 rounded-full border border-dashed border-[#B08401]/60 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#B08401] to-[#D49E8D] shadow-xs"></div>
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#B08401]"></span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-[#683B2B] group-hover:text-[#B08401] transition-colors">
                ARTFAIR
              </span>
              <span className="hidden xl:inline text-[9px] font-sans tracking-widest text-[#B08401] uppercase font-bold px-1.5 py-0.2 rounded bg-amber-50 border border-[#DED1BD]">
                Youth POD & Decor
              </span>
            </div>
          </div>
        </button>

        {/* Zone 2: Prominent Smart Search Bar with Live Autocomplete Popover */}
        <div ref={searchContainerRef} className="relative flex-1 max-w-xl mx-1 sm:mx-2">
          <div
            className={`relative flex items-center bg-white border rounded-full transition-all duration-200 shadow-2xs ${
              isSearchFocused
                ? 'border-[#B08401] ring-3 ring-[#B08401]/15 shadow-sm'
                : 'border-[#DED1BD] hover:border-[#B08401]/60'
            }`}
          >
            <Search className="w-4 h-4 ml-3.5 text-[#683B2B]/50 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!isSearchFocused) setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setIsSearchFocused(false);
                }
              }}
              placeholder="Tìm sticker chibi, áo thun Y2K, logo tiệm bánh, washi tape, ốp lưng..."
              className="w-full px-3 py-2 text-xs text-[#683B2B] placeholder:text-[#683B2B]/45 bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                }}
                className="p-1 mr-2 text-[#683B2B]/40 hover:text-[#683B2B] hover:bg-stone-100 rounded-full cursor-pointer transition-colors"
                title="Xóa tìm kiếm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete / Live Search Suggestions Popover */}
          {isSearchFocused && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#DED1BD] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              
              {/* Case A: Query is Empty -> Show Trending & Suggested Topics */}
              {!trimmedQuery && (
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#683B2B]/80 font-serif">
                    <TrendingUp className="w-3.5 h-3.5 text-[#B08401]" />
                    <span>Xu hướng tìm kiếm nghệ thuật</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {trendingSearches.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (item.type === 'category' && onSelectCategory) {
                            onSelectCategory(item.value as Category);
                            setActiveScreen('discovery');
                          } else if (item.type === 'artist' && onSelectArtist) {
                            onSelectArtist(item.value);
                          } else {
                            setSearchQuery(item.value);
                          }
                          setIsSearchFocused(false);
                        }}
                        className="px-2.5 py-1 text-[11px] bg-[#FAF6F2] hover:bg-[#D49E8D]/15 text-[#683B2B] border border-[#DED1BD] rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span className="text-[#B08401]">#</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Case B: Query is Active -> 3 Rich Suggestion Groups */}
              {trimmedQuery && (
                <div className="max-h-96 overflow-y-auto divide-y divide-[#DED1BD]/40 text-xs">
                  
                  {/* Group 1: 🎨 Suggested Artworks */}
                  {suggestedArtworks.length > 0 && (
                    <div className="p-3">
                      <div className="flex items-center justify-between pb-2 text-[11px] font-semibold text-[#683B2B]/70 uppercase tracking-wider">
                        <span className="flex items-center gap-1 text-[#B08401]">
                          <Palette className="w-3.5 h-3.5" /> Tác phẩm gợi ý
                        </span>
                        <span className="text-[10px] text-[#683B2B]/40">
                          {suggestedArtworks.length} kết quả
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {suggestedArtworks.map((art) => (
                          <div
                            key={art.id}
                            onClick={() => {
                              if (onSelectArtwork) onSelectArtwork(art);
                              setIsSearchFocused(false);
                            }}
                            className="flex items-center gap-3 p-1.5 hover:bg-[#FAF6F2] rounded-lg transition-colors cursor-pointer group"
                          >
                            <img
                              src={art.imageUrl}
                              alt={art.title}
                              className="w-10 h-10 rounded-md object-cover border border-[#DED1BD] shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-serif font-semibold text-[#683B2B] group-hover:text-[#B08401] truncate transition-colors">
                                {art.title}
                              </p>
                              <p className="text-[11px] text-[#683B2B]/60 truncate">
                                {art.artistName} • <span className="text-[#B08401] font-medium">{art.category}</span>
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs font-semibold text-[#683B2B] block">
                                {art.personalPrice.toLocaleString('vi-VN')} ₫
                              </span>
                              <span className="text-[10px] text-[#683B2B]/50">Cá nhân</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Group 2: 👩‍🎨 Suggested Artists / Creators */}
                  {suggestedArtists.length > 0 && (
                    <div className="p-3 bg-[#FAF6F2]/30">
                      <div className="flex items-center justify-between pb-2 text-[11px] font-semibold text-[#683B2B]/70 uppercase tracking-wider">
                        <span className="flex items-center gap-1 text-[#B08401]">
                          <UserCheck className="w-3.5 h-3.5" /> Nghệ sĩ & Studio
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {suggestedArtists.map((artist) => (
                          <div
                            key={artist.id}
                            onClick={() => {
                              if (onSelectArtist) onSelectArtist(artist.id);
                              setIsSearchFocused(false);
                            }}
                            className="flex items-center gap-2.5 p-1.5 hover:bg-white rounded-lg transition-colors cursor-pointer group"
                          >
                            <img
                              src={artist.avatar}
                              alt={artist.name}
                              className="w-8 h-8 rounded-full object-cover border border-[#DED1BD] shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-medium text-[#683B2B] group-hover:text-[#B08401] transition-colors truncate">
                                  {artist.name}
                                </span>
                                <span className="text-[10px] text-[#B08401] px-1 py-0.2 rounded bg-amber-50 border border-amber-200">
                                  ⭐ {artist.rating}
                                </span>
                              </div>
                              <p className="text-[10px] text-[#683B2B]/60 truncate">
                                {artist.pseudonym} • {artist.location}
                              </p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[#683B2B]/40 group-hover:text-[#B08401] shrink-0 transition-transform group-hover:translate-x-0.5" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Group 3: 🏷️ Categories & Tags */}
                  {suggestedCategories.length > 0 && (
                    <div className="p-3">
                      <div className="pb-2 text-[11px] font-semibold text-[#683B2B]/70 uppercase tracking-wider flex items-center gap-1 text-[#B08401]">
                        <Tag className="w-3.5 h-3.5" /> Thẻ Danh mục phù hợp
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {suggestedCategories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              if (onSelectCategory) onSelectCategory(cat);
                              setSearchQuery('');
                              setActiveScreen('discovery');
                              setIsSearchFocused(false);
                            }}
                            className="px-2.5 py-1 text-xs bg-[#FAF6F2] hover:bg-[#B08401] hover:text-white text-[#683B2B] border border-[#DED1BD] rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <span>Khám phá: </span>
                            <span className="font-semibold">{cat}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Empty Suggestion State */}
                  {!hasSuggestions && (
                    <div className="p-6 text-center text-xs text-[#683B2B]/60">
                      <p>Không tìm thấy đề xuất trực tiếp cho &ldquo;{searchQuery}&rdquo;.</p>
                      <p className="mt-1 text-[11px] text-[#683B2B]/40">
                        Nhấn phím bất kỳ hoặc xem thêm kết quả tìm kiếm tự do trên sàn.
                      </p>
                    </div>
                  )}

                  {/* Quick Action Footer */}
                  <div className="p-2.5 bg-[#FAF6F2] flex items-center justify-between text-[11px] text-[#683B2B]/70">
                    <span>Tìm kiếm ngữ nghĩa với toàn bộ kho nghệ thuật</span>
                    <button
                      onClick={() => {
                        setIsSearchFocused(false);
                        setActiveScreen('discovery');
                      }}
                      className="text-[#B08401] font-semibold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>Xem tất cả kết quả</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}
        </div>

        {/* Zone 3: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs uppercase tracking-wider font-medium text-[#683B2B]/80 shrink-0">
          <button
            onClick={() => setActiveScreen('discovery')}
            className={`hover:text-[#B08401] transition-colors cursor-pointer py-1 ${
              activeScreen === 'discovery' ? 'text-[#B08401] font-semibold border-b border-[#B08401]' : ''
            }`}
          >
            Khám phá
          </button>
          <button
            onClick={onOpenArtistProfile}
            className="hover:text-[#B08401] transition-colors cursor-pointer py-1"
          >
            Họa sĩ tiêu biểu
          </button>
          <button
            onClick={() => {
              if (!currentUser) {
                onOpenAuth('buyer');
              } else {
                onOpenDashboard('collector');
              }
            }}
            className={`hover:text-[#B08401] transition-colors cursor-pointer py-1 ${
              activeScreen === 'dashboard' ? 'text-[#B08401] font-semibold border-b border-[#B08401]' : ''
            }`}
          >
            Bộ sưu tập & Tiến độ
          </button>
        </nav>

        {/* Zone 4: Primary Actions (Wishlist, Notifications, Upload CTA, User Profile) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#683B2B] hover:text-[#B08401] transition-colors rounded-full hover:bg-[#DED1BD]/30 cursor-pointer"
            title="Tác phẩm yêu thích"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B08401] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-[#683B2B] hover:text-[#B08401] transition-colors rounded-full hover:bg-[#DED1BD]/30 cursor-pointer"
              title="Thông báo hệ thống"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D49E8D] rounded-full ring-2 ring-[#FAF6F2]"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-[#DED1BD] rounded-xl shadow-xl py-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b border-[#DED1BD]/60 flex items-center justify-between">
                  <span className="font-serif text-sm font-semibold text-[#683B2B]">Thông Báo Bản Quyền & Tiến Độ</span>
                  <span className="text-[10px] text-[#B08401] bg-[#FAF6F2] px-2 py-0.5 rounded border border-[#DED1BD]">2 mới</span>
                </div>
                <div className="divide-y divide-[#DED1BD]/40 max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-[#FAF6F2]/80 transition-colors text-xs">
                      <div className="flex items-center gap-1.5 font-medium text-[#683B2B]">
                        {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-[#B08401]"></span>}
                        <span>{n.title}</span>
                      </div>
                      <p className="text-[#683B2B]/70 mt-1 leading-relaxed">{n.desc}</p>
                      <span className="text-[10px] text-[#683B2B]/40 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
                <div className="px-4 pt-2 text-center border-t border-[#DED1BD]/60">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      onOpenDashboard('collector');
                    }}
                    className="text-xs text-[#B08401] hover:underline font-medium cursor-pointer"
                  >
                    Xem chi tiết trong Dashboard →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Creator Upload CTA Button */}
          <button
            onClick={() => {
              if (!currentUser) {
                onOpenAuth('creator');
              } else {
                onOpenStudio();
              }
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold tracking-wide text-white bg-[#683B2B] hover:bg-[#B08401] rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Đăng Tranh</span>
          </button>

          {/* User Profile or Auth Trigger */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-full border border-[#DED1BD] bg-white/80 hover:border-[#B08401] transition-all cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="hidden md:inline text-xs font-medium text-[#683B2B] pr-1">
                  {currentUser.name}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FAF6F2] text-[#B08401] font-semibold border border-[#DED1BD] uppercase">
                  {currentUser.role === 'creator' ? 'Artist' : 'Collector'}
                </span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#DED1BD] rounded-xl shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-[#DED1BD]/60">
                    <p className="text-xs font-semibold text-[#683B2B]">{currentUser.name}</p>
                    <p className="text-[11px] text-[#683B2B]/60 truncate">{currentUser.email}</p>
                    <div className="mt-1 flex items-center justify-between text-[11px]">
                      <span className="text-[#683B2B]/70">Số dư khả dụng:</span>
                      <span className="font-semibold text-[#B08401]">
                        {currentUser.balance.toLocaleString('vi-VN')} ₫
                      </span>
                    </div>
                  </div>

                  <div className="py-1 text-xs text-[#683B2B]">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenDashboard('collector');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#FAF6F2] transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#B08401]" />
                      <span>Kho Tranh Sở Hữu & Escrow</span>
                    </button>
                    {currentUser.role === 'creator' && (
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onOpenDashboard('creator');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#FAF6F2] transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-[#B08401]" />
                        <span>Creator Hub & Quản Lý Doanh Thu</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenStudio();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#FAF6F2] transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4 text-[#B08401]" />
                      <span>Studio Đăng Bán Tranh</span>
                    </button>
                  </div>

                  <div className="border-t border-[#DED1BD]/60 pt-1">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-700 hover:bg-red-50 transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('buyer')}
              className="px-4 py-2 text-xs font-semibold text-[#683B2B] border border-[#683B2B] hover:bg-[#683B2B] hover:text-[#FAF6F2] rounded-lg transition-all cursor-pointer whitespace-nowrap"
            >
              Đăng nhập / Đăng ký
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
