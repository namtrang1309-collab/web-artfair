import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Palette, ShoppingBag, Heart, CheckCircle2 } from 'lucide-react';

interface HeroBannerProps {
  onExploreGallery: () => void;
  onOpenCommission: () => void;
  onOpenArtistProfile: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreGallery,
  onOpenCommission,
  onOpenArtistProfile,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF6F2] border-b border-[#DED1BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        
        {/* Curatorial Header Info */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-[#DED1BD]/70 text-[11px] sm:text-xs text-[#683B2B]/75 uppercase tracking-wider font-sans font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B08401] animate-pulse"></span>
            <span>SÀN THIẾT KẾ POD & DECOR NGHỆ SĨ TRẺ</span>
            <span aria-hidden="true" className="text-[#DED1BD]">·</span>
            <span className="text-[#B08401] font-semibold">GIÁ TỪ 30.000 ₫</span>
          </div>
          <div className="flex items-center gap-2 text-[#683B2B]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B08401]" />
            <span>KÝ QUỸ ESCROW BẢO VỆ 100% BẢN QUYỀN ARTIST</span>
          </div>
        </div>

        {/* Main Grid: Editorial Typography Left & Hero Visual Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pt-6 sm:pt-8">
          
          {/* Left Column: Slogan & Editorial Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-[#B08401]/30 rounded-full text-xs font-semibold text-[#B08401]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Youth Artist POD & Daily Decor Marketplace</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#683B2B] leading-[1.2] text-balance">
              Groom Your Daily Vibe — Sân chơi sáng tạo & bản quyền cho Artist trẻ.
            </h1>

            <p className="text-[#683B2B]/85 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
              Nền tảng mua bán file thiết kế độc quyền phục vụ in ấn sticker, áo thun, logo và vật phẩm trang trí mỗi ngày. Bảo vệ bản quyền minh bạch cho nghệ sĩ trẻ.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onExploreGallery}
                className="px-5 py-3 text-xs sm:text-sm font-semibold tracking-wider text-white bg-[#683B2B] hover:bg-[#B08401] rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Săn Mẫu Thiết Kế Mới</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCommission}
                className="px-5 py-3 text-xs sm:text-sm font-semibold tracking-wider text-[#683B2B] bg-white border border-[#DED1BD] hover:border-[#B08401] hover:text-[#B08401] rounded-xl transition-all cursor-pointer shadow-2xs flex items-center gap-2"
              >
                <Palette className="w-4 h-4 text-[#B08401]" />
                <span>Đặt Vẽ Chibi / Custom</span>
              </button>
            </div>

            {/* Micro proof indicators */}
            <div className="pt-4 grid grid-cols-3 gap-3 text-xs text-[#683B2B]/75 border-t border-[#DED1BD]/60">
              <div>
                <span className="font-serif text-base sm:text-lg font-bold text-[#683B2B] tabular-nums block">
                  30.000 ₫+
                </span>
                <span className="text-[11px] text-[#683B2B]/70">Micro-pricing hạt dẻ</span>
              </div>
              <div className="border-l border-[#DED1BD] pl-3">
                <span className="font-serif text-base sm:text-lg font-bold text-[#683B2B] tabular-nums block">
                  Vector & 300 DPI
                </span>
                <span className="text-[11px] text-[#683B2B]/70">In áo thun, sticker, ốp</span>
              </div>
              <div className="border-l border-[#DED1BD] pl-3">
                <span className="font-serif text-base sm:text-lg font-bold text-[#683B2B] tabular-nums block">
                  100% Hợp Pháp
                </span>
                <span className="text-[11px] text-[#683B2B]/70">Quyền in POD cho Shop</span>
              </div>
            </div>
          </div>

          {/* Right Column: Youth Vibe Visual & Featured Artist Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#DED1BD] shadow-md group bg-white">
              <div className="aspect-16/10 relative overflow-hidden bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
                  alt="Bộ sưu tập sticker và merchandise nghệ sĩ trẻ ARTFAIR"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
                
                {/* Visual Watermark tag */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[10px] text-[#683B2B] px-2.5 py-0.5 rounded-full font-bold shadow-xs">
                  ✨ Hot Trend Sinh Viên Mỹ Thuật
                </div>

                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-[#D49E8D] font-bold block">
                    BST Mới Ra Mắt Tuần Này
                  </span>
                  <p className="font-serif text-base sm:text-lg font-semibold tracking-wide">
                    Set Sticker Chibi Mèo Bánh Mì Lười & Decor Vibe
                  </p>
                  <p className="text-xs text-white/80 font-sans mt-0.5">
                    Giá tải file in cá nhân: <span className="font-bold text-amber-300">35.000 ₫</span> · Bản quyền Shop POD: <span className="font-bold text-amber-300">95.000 ₫</span>
                  </p>
                </div>
              </div>

              {/* Featured Young Artist Ribbon underneath Keyvisual */}
              <div className="p-3.5 bg-white border-t border-[#DED1BD] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                    alt="Hà My"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#B08401]/30 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-[#683B2B] truncate">Hà My (Mèo Cam)</span>
                      <span className="text-[9px] px-1.5 py-0.2 bg-amber-50 text-[#B08401] rounded-md font-semibold border border-[#DED1BD]">
                        Artist Sinh Viên
                      </span>
                    </div>
                    <p className="text-[11px] text-[#683B2B]/70 truncate">
                      ⭐ 4.99 · 128 đơn hoàn tất · Giá vẽ từ 95k
                    </p>
                  </div>
                </div>

                <button
                  onClick={onOpenArtistProfile}
                  className="px-3 py-1.5 text-xs font-semibold text-[#683B2B] hover:text-[#B08401] hover:bg-[#FAF6F2] rounded-lg border border-[#DED1BD] transition-colors cursor-pointer shrink-0"
                >
                  Xem Shop →
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
