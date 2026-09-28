import React, { useState } from 'react';
import { X, Star, Clock, ShieldCheck, Check, Sparkles, Send, Calendar, DollarSign, Upload, Image as ImageIcon, Heart } from 'lucide-react';
import { ArtistProfile, Artwork, CommissionOrder, LicenseType, User } from '../types';

interface ArtistProfileModalProps {
  artist: ArtistProfile;
  isOpen: boolean;
  onClose: () => void;
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
  onCommissionSubmit: (commission: CommissionOrder) => void;
  currentUser: User | null;
  onRequireAuth: () => void;
}

export const ArtistProfileModal: React.FC<ArtistProfileModalProps> = ({
  artist,
  isOpen,
  onClose,
  artworks,
  onSelectArtwork,
  onCommissionSubmit,
  currentUser,
  onRequireAuth,
}) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'commissions'>('gallery');
  const [showBriefModal, setShowBriefModal] = useState(false);

  // Commission Brief Form
  const [briefTitle, setBriefTitle] = useState('');
  const [briefConcept, setBriefConcept] = useState('');
  const [moodboardUrl, setMoodboardUrl] = useState('');
  const [budget, setBudget] = useState<number>(8500000);
  const [deadline, setDeadline] = useState('2026-04-20');
  const [licenseType, setLicenseType] = useState<LicenseType>('commercial');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const artistArtworks = artworks.filter((a) => a.artistId === artist.id || a.artistName.includes(artist.name));

  const handleOpenCommissionForm = (packagePrice?: number, packageName?: string) => {
    if (!currentUser) {
      onRequireAuth();
      return;
    }
    if (packagePrice) {
      setBudget(packagePrice);
    }
    if (packageName) {
      setBriefTitle(`Đơn đặt vẽ: ${packageName}`);
    }
    setShowBriefModal(true);
  };

  const handleSubmitBrief = (e: React.FormEvent) => {
    e.preventDefault();
    if (!briefTitle.trim() || !briefConcept.trim()) {
      alert('Vui lòng điền đầy đủ tiêu đề và nội dung ý tưởng sáng tác.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const newOrder: CommissionOrder = {
        id: `CMS-${Date.now().toString().slice(-6)}`,
        title: briefTitle.trim(),
        buyerName: currentUser?.name || 'Nguyễn Trần Hải (Bạn)',
        artistName: artist.pseudonym || artist.name,
        artistAvatar: artist.avatar,
        budget: Number(budget),
        licenseType: licenseType,
        currentStep: 'deposit_escrow',
        createdAt: new Date().toISOString().split('T')[0],
        deadline: deadline,
        brief: briefConcept.trim(),
        sketches: [],
        escrowStatus: 'locked',
      };

      onCommissionSubmit(newOrder);
      setShowBriefModal(false);
      alert(`Yêu cầu Commission và khoản ký quỹ ${budget.toLocaleString('vi-VN')} ₫ đã được kích hoạt trên hệ thống Escrow ARTFAIR!`);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-[#FAF6F2] border border-[#DED1BD] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Cover Banner */}
        <div className="relative h-44 sm:h-56 w-full bg-stone-200 overflow-hidden shrink-0">
          <img
            src={artist.coverImage}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Header Info */}
        <div className="relative px-6 pb-4 pt-2 border-b border-[#DED1BD] bg-[#FAF6F2] shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20">
            {/* Avatar & Pseudonym */}
            <div className="flex items-end gap-4">
              <img
                src={artist.avatar}
                alt={artist.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-[#FAF6F2] shadow-xl border border-[#B08401]/30 shrink-0"
              />
              <div className="space-y-1 pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#683B2B]">
                    {artist.pseudonym}
                  </h1>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300">
                    Verified Pro
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#B08401]/10 text-[#B08401] border border-[#B08401]/30">
                    Top Commission 2026
                  </span>
                </div>
                <p className="text-xs text-[#683B2B]/70 font-sans">
                  Họ tên: <strong>{artist.name}</strong> · {artist.location}
                </p>
              </div>
            </div>

            {/* Quick Action: Send Commission Request */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleOpenCommissionForm()}
                className="px-5 py-2.5 text-xs font-semibold tracking-wider text-white bg-[#B08401] hover:bg-[#977000] rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-2 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                <span>Gửi Yêu Cầu Vẽ Theo Yêu Cầu</span>
              </button>
            </div>
          </div>

          {/* Bio text */}
          <p className="text-xs text-[#683B2B]/85 mt-4 leading-relaxed max-w-3xl font-sans">
            {artist.bio}
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center gap-6 pt-4 mt-3 border-t border-[#DED1BD]/60 text-xs text-[#683B2B]">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-[#B08401] text-[#B08401]" />
              <span className="font-bold tabular-nums">{artist.rating.toFixed(2)}</span>
              <span className="text-[#683B2B]/60">({artist.reviewCount} đánh giá)</span>
            </div>
            <div className="h-4 w-px bg-[#DED1BD]"></div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#B08401]" />
              <span className="text-[#683B2B]/60">Tỉ lệ phản hồi:</span>
              <span className="font-bold">{artist.responseRate}</span>
            </div>
            <div className="h-4 w-px bg-[#DED1BD]"></div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#B08401]" />
              <span className="text-[#683B2B]/60">Giao dịch thành công:</span>
              <span className="font-bold tabular-nums">{artist.completedOrders} tác phẩm</span>
            </div>
            <div className="h-4 w-px bg-[#DED1BD]"></div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-emerald-800">
                Đang nhận đơn ({artist.slotsRemaining} slot tháng này)
              </span>
            </div>
          </div>

          {/* Tabs: Gallery vs Commission Hub */}
          <div className="flex items-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-[#683B2B] text-white shadow-xs'
                  : 'bg-white text-[#683B2B] hover:bg-[#DED1BD]/40 border border-[#DED1BD]'
              }`}
            >
              Gallery Tranh Có Sẵn ({artistArtworks.length})
            </button>
            <button
              onClick={() => setActiveTab('commissions')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'commissions'
                  ? 'bg-[#683B2B] text-white shadow-xs'
                  : 'bg-white text-[#683B2B] hover:bg-[#DED1BD]/40 border border-[#DED1BD]'
              }`}
            >
              Góc Commission & Bảng Giá Dịch Vụ
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* TAB 1: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {artistArtworks.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onClose();
                      onSelectArtwork(art);
                    }}
                    className="group bg-white border border-[#DED1BD] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="aspect-4/3 overflow-hidden bg-stone-100 relative">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs font-mono">
                        {art.resolution}
                      </div>
                    </div>
                    <div className="p-3 space-y-1">
                      <span className="text-[10px] text-[#B08401] font-semibold uppercase">
                        {art.category} · {art.style}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-[#683B2B] line-clamp-1 group-hover:text-[#B08401] transition-colors">
                        {art.title}
                      </h4>
                      <div className="pt-1 flex items-center justify-between text-xs font-sans">
                        <span className="text-[#683B2B]/60 text-[11px]">Bản quyền từ</span>
                        <span className="font-serif font-bold text-[#683B2B]">
                          {art.personalPrice.toLocaleString('vi-VN')} ₫
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: COMMISSIONS & PACKAGES */}
          {activeTab === 'commissions' && (
            <div className="space-y-6">
              <div className="bg-white/80 border border-[#DED1BD] rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#683B2B]">
                    Quy Trình Đặt Vẽ Commission Minh Bạch Với Ký Quỹ Escrow
                  </h3>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    🟢 Đang nhận yêu cầu
                  </span>
                </div>
                <p className="text-xs text-[#683B2B]/75 leading-relaxed">
                  Bạn gửi brief yêu cầu sáng tác ➔ Họa sĩ phản hồi phác thảo ý niệm ➔ Tiền cọc được phong tỏa an toàn trên hệ thống ARTFAIR Escrow ➔ Bạn duyệt bản vẽ từng giai đoạn (Sketch, Color, Final) trước khi thanh toán chính thức được chuyển cho họa sĩ.
                </p>
              </div>

              {/* 3 Pricing Packages */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {artist.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="p-5 bg-white border border-[#DED1BD] rounded-2xl shadow-xs flex flex-col justify-between space-y-4 hover:border-[#B08401] transition-all"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] text-[#B08401] font-semibold uppercase tracking-wider block">
                        Gói Dịch Vụ
                      </span>
                      <h4 className="font-serif text-lg font-bold text-[#683B2B]">
                        {pkg.name}
                      </h4>
                      <p className="text-xs text-[#683B2B]/70 leading-relaxed min-h-[36px]">
                        {pkg.tagline}
                      </p>

                      <div className="pt-2 border-t border-[#DED1BD]/50">
                        <span className="font-serif text-2xl font-bold text-[#683B2B] tabular-nums">
                          {pkg.price.toLocaleString('vi-VN')} ₫
                        </span>
                        <div className="text-[11px] text-[#683B2B]/60 mt-1 flex items-center justify-between">
                          <span>Thời gian: ~{pkg.estimatedDays} ngày</span>
                          <span>{pkg.revisions} lần sửa bản vẽ</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="pt-2 space-y-1.5 text-xs text-[#683B2B]/80 font-sans">
                        {pkg.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px]">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenCommissionForm(pkg.price, pkg.name)}
                      className="w-full py-2.5 text-xs font-semibold text-white bg-[#683B2B] hover:bg-[#B08401] rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      Chọn Gói & Gửi Brief
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* CUSTOM COMMISSION BRIEF MODAL */}
      {showBriefModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-[#FAF6F2] border border-[#DED1BD] rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DED1BD]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#B08401]" />
                <h3 className="font-serif text-lg font-bold text-[#683B2B]">
                  Brief Yêu Cầu Vẽ Commission Riêng
                </h3>
              </div>
              <button
                onClick={() => setShowBriefModal(false)}
                className="text-[#683B2B]/60 hover:text-[#683B2B] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitBrief} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#683B2B] font-semibold mb-1">
                  Tiêu đề dự án / Mục đích tranh <span className="text-[#B08401]">*</span>
                </label>
                <input
                  type="text"
                  value={briefTitle}
                  onChange={(e) => setBriefTitle(e.target.value)}
                  placeholder="Ví dụ: Minh họa bìa sách truyện ngắn hoặc Tranh chân dung gia đình"
                  className="w-full px-3 py-2 bg-white border border-[#DED1BD] rounded-lg text-[#683B2B] focus:border-[#B08401]"
                />
              </div>

              <div>
                <label className="block text-[#683B2B] font-semibold mb-1">
                  Mô tả ý tưởng & Moodboard chi tiết <span className="text-[#B08401]">*</span>
                </label>
                <textarea
                  rows={3}
                  value={briefConcept}
                  onChange={(e) => setBriefConcept(e.target.value)}
                  placeholder="Mô tả bối cảnh, cảm xúc, màu sắc chủ đạo, tỷ lệ khung hình, nhân vật mong muốn..."
                  className="w-full px-3 py-2 bg-white border border-[#DED1BD] rounded-lg text-[#683B2B] focus:border-[#B08401]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#683B2B] font-semibold mb-1">Ngân sách dự kiến (VND)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-[#DED1BD] rounded-lg font-bold text-[#683B2B] focus:border-[#B08401]"
                  />
                </div>
                <div>
                  <label className="block text-[#683B2B] font-semibold mb-1">Hạn bàn giao mong muốn</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#DED1BD] rounded-lg text-[#683B2B] focus:border-[#B08401]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#683B2B] font-semibold mb-1">Loại bản quyền yêu cầu</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLicenseType('personal')}
                    className={`py-2 px-3 text-center rounded-lg border transition-all cursor-pointer ${
                      licenseType === 'personal'
                        ? 'bg-white border-[#B08401] ring-1 ring-[#B08401] font-bold text-[#683B2B]'
                        : 'bg-white/60 border-[#DED1BD] text-[#683B2B]/70'
                    }`}
                  >
                    👤 Sử dụng cá nhân
                  </button>
                  <button
                    type="button"
                    onClick={() => setLicenseType('commercial')}
                    className={`py-2 px-3 text-center rounded-lg border transition-all cursor-pointer ${
                      licenseType === 'commercial'
                        ? 'bg-white border-[#B08401] ring-1 ring-[#B08401] font-bold text-[#683B2B]'
                        : 'bg-white/60 border-[#DED1BD] text-[#683B2B]/70'
                    }`}
                  >
                    🏢 Thương mại / Doanh nghiệp
                  </button>
                </div>
              </div>

              {/* Escrow Guarantee Statement */}
              <div className="p-3 bg-white/70 border border-[#DED1BD] rounded-xl flex items-start gap-2 text-[11px] text-[#683B2B]">
                <ShieldCheck className="w-4 h-4 text-[#B08401] shrink-0 mt-0.5" />
                <span>
                  Khoản tiền <strong>{budget.toLocaleString('vi-VN')} ₫</strong> sẽ được khóa trong quỹ ủy thác Escrow. Bạn chỉ giải ngân khi hài lòng với nghiệm thu bản vẽ.
                </span>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowBriefModal(false)}
                  className="flex-1 py-2.5 text-[#683B2B] border border-[#DED1BD] rounded-xl hover:bg-white transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 text-white bg-[#B08401] hover:bg-[#977000] rounded-xl transition-colors cursor-pointer font-semibold shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Đang kích hoạt Escrow...' : 'Gửi Brief & Ký Quỹ Escrow'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
