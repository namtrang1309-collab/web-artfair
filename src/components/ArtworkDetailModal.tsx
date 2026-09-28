import React, { useState, useRef } from 'react';
import { X, ZoomIn, ShieldCheck, Check, Info, FileCheck, Layers, Sparkles, Download, Heart } from 'lucide-react';
import { Artwork, LicenseType } from '../types';

interface ArtworkDetailModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
  onBuyNow: (artwork: Artwork, license: LicenseType) => void;
  onToggleWishlist: (artwork: Artwork) => void;
  isWishlisted: boolean;
  onArtistClick?: (artistId: string) => void;
}

export const ArtworkDetailModal: React.FC<ArtworkDetailModalProps> = ({
  artwork,
  isOpen,
  onClose,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onArtistClick,
}) => {
  const [activeTab, setActiveTab] = useState<'original' | 'canvas' | 'tshirt' | 'phonecase' | 'totebag'>('original');
  const [selectedLicense, setSelectedLicense] = useState<LicenseType>('personal');
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const imageContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !artwork) return null;

  const currentPrice = selectedLicense === 'personal' ? artwork.personalPrice : artwork.commercialPrice;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl bg-[#FAF6F2] border border-[#DED1BD] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DED1BD] bg-[#FAF6F2] shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg sm:text-xl font-bold text-[#683B2B]">
              {artwork.title}
            </span>
            <span className="hidden sm:inline text-xs font-sans text-[#B08401] uppercase tracking-widest font-semibold">
              · {artwork.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist(artwork)}
              className={`p-2 rounded-full border border-[#DED1BD] transition-colors cursor-pointer ${
                isWishlisted ? 'bg-[#B08401] text-white' : 'bg-white text-[#683B2B] hover:text-[#B08401]'
              }`}
              title="Yêu thích"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-[#DED1BD] bg-white text-[#683B2B] hover:bg-[#DED1BD]/40 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body - 2 Columns (Left: Visual Studio & Mockups / Right: Licensing & Specs) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* LEFT: Artwork Viewer with Interactive Mockup Switcher */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Mockup Selector Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#DED1BD]/40 rounded-xl overflow-x-auto">
              <button
                onClick={() => setActiveTab('original')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'original' ? 'bg-white text-[#683B2B] shadow-xs' : 'text-[#683B2B]/70 hover:text-[#683B2B]'
                }`}
              >
                Tranh Gốc (Zoom 300DPI)
              </button>
              <button
                onClick={() => setActiveTab('canvas')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'canvas' ? 'bg-white text-[#683B2B] shadow-xs' : 'text-[#683B2B]/70 hover:text-[#683B2B]'
                }`}
              >
                Khung Treo Tường
              </button>
              <button
                onClick={() => setActiveTab('tshirt')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'tshirt' ? 'bg-white text-[#683B2B] shadow-xs' : 'text-[#683B2B]/70 hover:text-[#683B2B]'
                }`}
              >
                Áo Thun Thời Trang
              </button>
              <button
                onClick={() => setActiveTab('phonecase')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'phonecase' ? 'bg-white text-[#683B2B] shadow-xs' : 'text-[#683B2B]/70 hover:text-[#683B2B]'
                }`}
              >
                Ốp Lưng Điện Thoại
              </button>
              <button
                onClick={() => setActiveTab('totebag')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'totebag' ? 'bg-white text-[#683B2B] shadow-xs' : 'text-[#683B2B]/70 hover:text-[#683B2B]'
                }`}
              >
                Túi Vải Canvas
              </button>
            </div>

            {/* Main Stage Display Area */}
            <div className="relative w-full aspect-4/3 rounded-xl border border-[#DED1BD] bg-[#EBE4DC] overflow-hidden flex items-center justify-center p-4">
              
              {/* Mode 1: Original Artwork with Hover Zoom Lens */}
              {activeTab === 'original' && (
                <div
                  ref={imageContainerRef}
                  onMouseEnter={() => setIsZooming(true)}
                  onMouseLeave={() => setIsZooming(false)}
                  onMouseMove={handleMouseMove}
                  className="relative w-full h-full rounded-lg overflow-hidden bg-white shadow-inner flex items-center justify-center cursor-crosshair select-none"
                >
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />

                  {/* Watermark */}
                  {artwork.hasWatermark && (
                    <div className="absolute inset-0 pointer-events-none watermark-overlay flex items-center justify-center">
                      <div className="rotate-[-20deg] text-xs font-serif font-bold text-white/40 tracking-widest px-3 py-1 border border-white/20 rounded">
                        ARTFAIR · PREVIEW ONLY
                      </div>
                    </div>
                  )}

                  {/* Zoom Lens Magnifier */}
                  {isZooming && (
                    <div
                      className="absolute pointer-events-none w-44 h-44 rounded-full border-2 border-[#B08401] shadow-2xl bg-white overflow-hidden hidden md:block z-30"
                      style={{
                        left: `calc(${zoomPos.x}% - 88px)`,
                        top: `calc(${zoomPos.y}% - 88px)`,
                        backgroundImage: `url(${artwork.imageUrl})`,
                        backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                        backgroundSize: '350%',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  )}

                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-[10px] text-white px-2 py-1 rounded font-sans flex items-center gap-1">
                    <ZoomIn className="w-3 h-3 text-[#DED1BD]" />
                    <span>Di chuột để soi nét cọ 300DPI</span>
                  </div>
                </div>
              )}

              {/* Mode 2: Gallery Wall Canvas Mockup */}
              {activeTab === 'canvas' && (
                <div className="relative w-full h-full flex items-center justify-center bg-stone-300 rounded-lg p-4 sm:p-6 overflow-hidden shadow-inner">
                  {artwork.mockupImages?.canvas ? (
                    <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={artwork.mockupImages.canvas}
                        alt="Canvas in room"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {/* Realistic in-scene art framed overlay */}
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <div className="w-[45%] max-w-[280px] p-2 bg-[#2D1B0E] shadow-2xl border border-[#B08401]/50 rounded-[2px]">
                          <div className="p-1 bg-[#FAF6F2]">
                            <img
                              src={artwork.imageUrl}
                              alt="Canvas Artwork in frame"
                              className="w-full h-auto object-cover shadow-inner"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Gallery Wall texture fallback */}
                      <div className="absolute inset-0 bg-gradient-to-b from-stone-200 via-stone-300 to-stone-400 opacity-80"></div>
                      <div className="absolute top-0 w-72 h-44 bg-amber-50/40 rounded-full blur-2xl"></div>
                      <div className="relative z-10 p-3 bg-[#382618] rounded shadow-2xl border-2 border-[#B08401]/40 max-w-[70%] max-h-[85%]">
                        <div className="p-1.5 bg-[#FAF6F2] shadow-inner">
                          <img
                            src={artwork.imageUrl}
                            alt="Canvas Mockup"
                            className="max-h-56 sm:max-h-72 object-contain"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <span className="absolute bottom-3 left-4 text-[11px] font-sans text-stone-900 bg-white/80 px-2 py-0.5 rounded backdrop-blur-xs font-medium shadow-xs">
                    Mockup: Khung tranh sơn mài gỗ óc chó trên tường phòng khách
                  </span>
                </div>
              )}

              {/* Mode 3: Fashion T-Shirt Mockup */}
              {activeTab === 'tshirt' && (
                <div className="relative w-full h-full flex flex-col items-center justify-center bg-stone-200/90 rounded-lg p-4">
                  {artwork.mockupImages?.tshirt ? (
                    <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={artwork.mockupImages.tshirt}
                        alt="T-shirt model"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {/* In-situ garment print blend */}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-32 sm:w-36 aspect-[3/4] p-1 rounded overflow-hidden shadow-sm opacity-90 mix-blend-multiply">
                          <img
                            src={artwork.imageUrl}
                            alt="T-shirt print overlay"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* T-Shirt SVG Container fallback */
                    <div className="relative w-64 h-72 sm:w-72 sm:h-80 flex items-center justify-center">
                      <svg className="w-full h-full drop-shadow-md text-white" viewBox="0 0 240 260" fill="currentColor">
                        <path d="M75 15 C85 35 155 35 165 15 L225 45 L195 85 L170 70 L170 245 C170 250 165 255 160 255 L80 255 C75 255 70 250 70 245 L70 70 L45 85 L15 45 Z" fill="#F4EFEA" stroke="#DED1BD" strokeWidth="2" />
                      </svg>
                      <div className="absolute top-20 w-28 sm:w-32 aspect-3/4 rounded overflow-hidden shadow-xs border border-stone-200/60 opacity-90 mix-blend-multiply">
                        <img
                          src={artwork.imageUrl}
                          alt="T-shirt print"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <span className="absolute bottom-3 left-4 text-[11px] font-sans text-stone-900 bg-white/80 px-2 py-0.5 rounded backdrop-blur-xs font-medium shadow-xs">
                    Ứng dụng in lụa / DTG trên áo thun oversize 250gsm (Bản quyền thương mại)
                  </span>
                </div>
              )}

              {/* Mode 4: Phone Case Mockup */}
              {activeTab === 'phonecase' && (
                <div className="relative w-full h-full flex flex-col items-center justify-center bg-stone-200 rounded-lg p-4">
                  {artwork.mockupImages?.phonecase ? (
                    <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={artwork.mockupImages.phonecase}
                        alt="Phone case lifestyle"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {/* Realistic phone case print */}
                      <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
                        <div className="w-32 sm:w-36 h-64 rounded-[28px] overflow-hidden shadow-2xl ring-2 ring-stone-800 bg-stone-900 relative">
                          <div className="absolute top-2.5 left-2.5 w-10 h-10 bg-stone-800 rounded-xl z-10 border border-stone-600"></div>
                          <img
                            src={artwork.imageUrl}
                            alt="Phone case artwork"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Smartphone Case Frame fallback */
                    <div className="relative w-40 sm:w-44 h-72 rounded-[36px] bg-stone-900 p-2 shadow-2xl ring-2 ring-stone-700 overflow-hidden">
                      <div className="absolute top-4 left-4 w-12 h-14 bg-stone-800 rounded-2xl border border-stone-600 z-20 flex flex-col items-center justify-around py-1">
                        <div className="w-3.5 h-3.5 rounded-full bg-stone-950 border border-stone-600"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-stone-950 border border-stone-600"></div>
                      </div>
                      <div className="w-full h-full rounded-[28px] overflow-hidden relative">
                        <img
                          src={artwork.imageUrl}
                          alt="Phone case print"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
                      </div>
                    </div>
                  )}

                  <span className="absolute bottom-3 left-4 text-[11px] font-sans text-stone-900 bg-white/80 px-2 py-0.5 rounded backdrop-blur-xs font-medium shadow-xs">
                    Mockup ốp lưng chống va đập phủ kính cường lực tráng bóng
                  </span>
                </div>
              )}

              {/* Mode 5: Tote Bag Mockup */}
              {activeTab === 'totebag' && (
                <div className="relative w-full h-full flex flex-col items-center justify-center bg-stone-200/80 rounded-lg p-4">
                  {artwork.mockupImages?.totebag ? (
                    <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={artwork.mockupImages.totebag}
                        alt="Tote bag lifestyle"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
                        <div className="w-36 sm:w-40 aspect-square rounded overflow-hidden shadow-md opacity-90 mix-blend-multiply border border-stone-300">
                          <img
                            src={artwork.imageUrl}
                            alt="Tote bag graphic"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Tote Bag Graphic fallback */
                    <div className="relative w-56 sm:w-64 h-68 sm:h-76 flex flex-col items-center justify-end">
                      <div className="absolute top-2 w-28 h-24 border-4 border-[#C9B8A2] rounded-t-full"></div>
                      <div className="w-48 sm:w-56 h-52 bg-[#E6DAC8] border border-[#D5C2AB] rounded-b-xl shadow-lg relative flex items-center justify-center p-3">
                        <div className="w-32 aspect-4/3 rounded overflow-hidden shadow-xs border border-[#C9B8A2] opacity-95 mix-blend-multiply">
                          <img
                            src={artwork.imageUrl}
                            alt="Tote bag print"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <span className="absolute bottom-3 left-4 text-[11px] font-sans text-stone-900 bg-white/80 px-2 py-0.5 rounded backdrop-blur-xs font-medium shadow-xs">
                    Mockup in nhiệt trên túi vải canvas vintage phong cách Art Gallery
                  </span>
                </div>
              )}

            </div>

            {/* Inspiration and Story Quote */}
            <div className="p-4 bg-white/70 border border-[#DED1BD] rounded-xl text-xs space-y-1.5">
              <span className="font-semibold text-[#B08401] uppercase tracking-wider text-[10px]">
                Lời tự sự của nghệ sĩ
              </span>
              <p className="text-[#683B2B]/90 italic font-serif text-sm leading-relaxed">
                "{artwork.inspiration}"
              </p>
              <p className="text-[#683B2B]/70 text-[11px] pt-1">
                {artwork.description}
              </p>
            </div>
          </div>

          {/* RIGHT: Technical Specifications & Dual License Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Header Details */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#DED1BD]/70">
                <div className="flex items-center gap-3">
                  <img
                    src={artwork.artistAvatar}
                    alt={artwork.artistName}
                    className="w-10 h-10 rounded-full object-cover border border-[#B08401]"
                  />
                  <div>
                    <button
                      onClick={() => onArtistClick && onArtistClick(artwork.artistId)}
                      className="text-sm font-bold text-[#683B2B] hover:text-[#B08401] transition-colors text-left cursor-pointer"
                    >
                      {artwork.artistName}
                    </button>
                    <p className="text-[11px] text-[#683B2B]/60">
                      ⭐ {artwork.artistRating.toFixed(2)} · Nghệ sĩ đã xác minh
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#683B2B]/60 uppercase tracking-widest block font-sans">
                    Phiên bản
                  </span>
                  <span className="font-mono text-xs font-bold text-[#683B2B]">
                    {artwork.editionRemaining}/{artwork.editionTotal} bản còn lại
                  </span>
                </div>
              </div>

              {/* Technical Specifications Sheet */}
              <div className="mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#683B2B] mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#B08401]" />
                  <span>Thông Số Bàn Giao Kỹ Thuật</span>
                </h4>
                
                <div className="bg-white/80 border border-[#DED1BD] rounded-xl p-3 text-xs divide-y divide-[#DED1BD]/40 font-sans">
                  <div className="py-1.5 flex justify-between">
                    <span className="text-[#683B2B]/60">Định dạng file:</span>
                    <span className="font-medium text-[#683B2B]">
                      {artwork.deliverables.join(' · ')}
                    </span>
                  </div>
                  <div className="py-1.5 flex justify-between">
                    <span className="text-[#683B2B]/60">Kích thước gốc:</span>
                    <span className="font-mono font-medium text-[#683B2B]">{artwork.dimensions}</span>
                  </div>
                  <div className="py-1.5 flex justify-between">
                    <span className="text-[#683B2B]/60">Độ phân giải:</span>
                    <span className="font-mono font-medium text-[#683B2B]">{artwork.resolution}</span>
                  </div>
                  <div className="py-1.5 flex justify-between">
                    <span className="text-[#683B2B]/60">Hệ màu in ấn:</span>
                    <span className="font-medium text-[#683B2B]">{artwork.colorProfile}</span>
                  </div>
                  <div className="py-1.5 flex justify-between">
                    <span className="text-[#683B2B]/60">Mã lưu trữ:</span>
                    <span className="font-mono text-[11px] text-[#B08401]">ART-2026-F98B</span>
                  </div>
                </div>
              </div>

              {/* MANDATORY LICENSE SELECTOR */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#683B2B]">
                    Chọn Gói Bản Quyền Cấp Phép <span className="text-[#B08401]">*</span>
                  </label>
                  <span className="text-[11px] text-[#B08401] underline cursor-pointer">
                    Quy định bản quyền
                  </span>
                </div>

                {/* Option 1: Personal License */}
                <div
                  onClick={() => setSelectedLicense('personal')}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedLicense === 'personal'
                      ? 'bg-white border-[#B08401] ring-2 ring-[#B08401]/30 shadow-xs'
                      : 'bg-white/50 border-[#DED1BD] hover:border-[#B08401]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedLicense === 'personal' ? 'border-[#B08401] bg-[#B08401]' : 'border-gray-400'
                      }`}>
                        {selectedLicense === 'personal' && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-xs font-bold text-[#683B2B]">
                        👤 Bản Quyền Cá Nhân (Personal License)
                      </span>
                    </div>
                    <span className="font-serif text-sm font-bold text-[#683B2B] tabular-nums">
                      {artwork.personalPrice.toLocaleString('vi-VN')} ₫
                    </span>
                  </div>
                  <p className="text-[11px] text-[#683B2B]/70 mt-1 pl-6 leading-relaxed">
                    Dùng cá nhân: Tải file gốc 300 DPI để in sticker, trang trí ốp lưng, dán sổ bullet journal, decor góc học tập hoặc in áo thun mặc riêng phi thương mại.
                  </p>
                </div>

                {/* Option 2: Commercial License */}
                <div
                  onClick={() => setSelectedLicense('commercial')}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedLicense === 'commercial'
                      ? 'bg-white border-[#B08401] ring-2 ring-[#B08401]/30 shadow-xs'
                      : 'bg-white/50 border-[#DED1BD] hover:border-[#B08401]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedLicense === 'commercial' ? 'border-[#B08401] bg-[#B08401]' : 'border-gray-400'
                      }`}>
                        {selectedLicense === 'commercial' && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-xs font-bold text-[#683B2B]">
                        🏢 Cấp Quyền Shop POD & Kinh Doanh (Commercial POD)
                      </span>
                    </div>
                    <span className="font-serif text-sm font-bold text-[#683B2B] tabular-nums">
                      {artwork.commercialPrice.toLocaleString('vi-VN')} ₫
                    </span>
                  </div>
                  <p className="text-[11px] text-[#683B2B]/70 mt-1 pl-6 leading-relaxed">
                    Cấp quyền Shop POD: Được quyền in ấn thương mại lên tới 10.000 sản phẩm (áo thun, sticker, washi tape, ốp lưng, túi tote, bao bì) kinh doanh hợp pháp.
                  </p>
                </div>
              </div>
            </div>

            {/* Escrow Guarantee & Buy Now CTA */}
            <div className="pt-4 border-t border-[#DED1BD] space-y-3">
              {/* Escrow Guarantee Box */}
              <div className="p-3 bg-[#FAF6F2] border border-[#DED1BD] rounded-xl flex items-start gap-2.5 text-xs text-[#683B2B]">
                <ShieldCheck className="w-5 h-5 text-[#B08401] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold text-[#683B2B]">Bảo Hộ Ký Quỹ ARTFAIR Escrow 100%</p>
                  <p className="text-[11px] text-[#683B2B]/70 leading-relaxed">
                    Số tiền được khóa an toàn. Bạn được kiểm tra file gốc (.PSD/.PNG 300DPI) đầy đủ trước khi tiền được chuyển cho nghệ sĩ.
                  </p>
                </div>
              </div>

              {/* Price summary & CTA */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-[#683B2B]/60 uppercase tracking-widest block font-sans">
                    Tổng thanh toán
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#683B2B] tabular-nums">
                    {currentPrice.toLocaleString('vi-VN')} ₫
                  </span>
                </div>

                <button
                  onClick={() => onBuyNow(artwork, selectedLicense)}
                  className="flex-1 py-3.5 px-6 text-xs sm:text-sm font-semibold tracking-wider text-white bg-[#683B2B] hover:bg-[#B08401] rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Mua Bản Quyền Ngay</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
