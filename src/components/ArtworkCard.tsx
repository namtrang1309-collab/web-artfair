import React, { useState } from 'react';
import { Heart, Star, Shield, Eye, Lock } from 'lucide-react';
import { Artwork } from '../types';

interface ArtworkCardProps {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
  onToggleWishlist: (artwork: Artwork) => void;
  isWishlisted: boolean;
  onArtistClick?: (artistId: string) => void;
  onWatermarkToast?: () => void;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  onSelect,
  onToggleWishlist,
  isWishlisted,
  onArtistClick,
  onWatermarkToast,
}) => {
  const [showWatermarkWarning, setShowWatermarkWarning] = useState(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowWatermarkWarning(true);
    if (onWatermarkToast) {
      onWatermarkToast();
    }
    setTimeout(() => {
      setShowWatermarkWarning(false);
    }, 2500);
  };

  // Aspect ratio class helper for varied Masonry grid
  const aspectClass = 
    artwork.aspectRatio === 'portrait' 
      ? 'aspect-[3/4]' 
      : artwork.aspectRatio === 'landscape' 
      ? 'aspect-[16/10]' 
      : 'aspect-square';

  return (
    <div className="group relative bg-white border border-[#DED1BD] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Artwork Visual Container with 1.03 scale hover and Watermark */}
      <div
        className={`relative ${aspectClass} overflow-hidden bg-stone-100 cursor-pointer select-none`}
        onClick={() => onSelect(artwork)}
        onContextMenu={handleContextMenu}
      >
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />

        {/* Diagonal Watermark Overlay for Anti-Theft Protection: CSS pattern + subtle repeating stamp */}
        {artwork.hasWatermark && (
          <div className="absolute inset-0 pointer-events-none watermark-overlay overflow-hidden flex flex-col justify-between p-4">
            {/* Top diagonal stamp */}
            <div className="flex justify-between items-center opacity-30 select-none text-[9px] font-mono tracking-widest text-[#B08401] uppercase font-bold">
              <span>ARTFAIR©2026</span>
              <span>PROTECTED</span>
            </div>

            {/* Central prominent watermark stamp */}
            <div className="self-center rotate-[-22deg] select-none text-xs sm:text-sm font-serif font-bold text-white/50 tracking-widest px-3 sm:px-4 py-1.5 border border-white/30 rounded backdrop-blur-[0.5px] bg-black/10">
              ARTFAIR©2026 · BẢN QUYỀN ĐƯỢC BẢO HỘ
            </div>

            {/* Bottom diagonal stamp */}
            <div className="flex justify-between items-center opacity-30 select-none text-[9px] font-mono tracking-widest text-[#B08401] uppercase font-bold">
              <span>300 DPI MASTER</span>
              <span>ARTFAIR©2026</span>
            </div>
          </div>
        )}

        {/* Right-click Warning Overlay */}
        {showWatermarkWarning && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center text-white animate-in fade-in duration-150 z-20">
            <Lock className="w-6 h-6 text-[#B08401] mb-1.5" />
            <p className="font-serif text-sm font-bold text-[#DED1BD]">Bản quyền ARTFAIR được bảo hộ</p>
            <p className="text-[11px] text-white/80 mt-1 max-w-xs leading-relaxed">
              Hình ảnh gốc độ phân giải cao (300 DPI) sẽ được bàn giao đầy đủ sau khi hoàn tất giao dịch ký quỹ Escrow.
            </p>
          </div>
        )}

        {/* Status Tag Top Left (Clean unboxed/subtle) */}
        <div className="absolute top-2.5 left-2.5 z-10">
          {artwork.isSoldOut ? (
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-[#683B2B]/90 text-white backdrop-blur-xs">
              Đã bán
            </span>
          ) : (
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-white/90 text-[#683B2B] border border-[#DED1BD] backdrop-blur-xs">
              Giá cố định
            </span>
          )}
        </div>

        {/* Wishlist Button Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(artwork);
          }}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-[#B08401] text-white'
              : 'bg-white/85 text-[#683B2B] hover:text-[#B08401] hover:bg-white'
          }`}
          title="Thêm vào danh sách yêu thích"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between text-white">
          <span className="text-xs font-medium flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>Xem chi tiết & Mockup</span>
          </span>
          <span className="text-[11px] font-mono text-[#DED1BD] tabular-nums">
            {artwork.resolution}
          </span>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata clean unboxed row */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#683B2B]/70 mb-1">
            <span>{artwork.category}</span>
            <span aria-hidden="true">·</span>
            <span>{artwork.style}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{artwork.dimensions}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(artwork)}
            className="font-serif text-lg font-semibold text-[#683B2B] hover:text-[#B08401] transition-colors line-clamp-1 cursor-pointer"
          >
            {artwork.title}
          </h3>

          {/* Artist line with Star Badge */}
          <div className="flex items-center justify-between mt-1.5">
            <button
              onClick={() => onArtistClick && onArtistClick(artwork.artistId)}
              className="text-xs font-medium text-[#683B2B]/80 hover:text-[#B08401] transition-colors truncate max-w-[160px] text-left cursor-pointer"
            >
              {artwork.artistName}
            </button>
            <div className="flex items-center gap-1 text-[11px] text-[#B08401] font-semibold tabular-nums shrink-0">
              <Star className="w-3 h-3 fill-[#B08401]" />
              <span>{artwork.artistRating.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="pt-2 border-t border-[#DED1BD]/50 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#683B2B]/60 uppercase tracking-wider block font-sans">
              Bản quyền cá nhân từ
            </span>
            <span className="font-serif text-base font-bold text-[#683B2B] tabular-nums">
              {artwork.personalPrice.toLocaleString('vi-VN')} ₫
            </span>
          </div>

          <button
            onClick={() => onSelect(artwork)}
            className="px-3 py-1.5 text-xs font-semibold text-[#683B2B] hover:text-white bg-[#FAF6F2] hover:bg-[#B08401] border border-[#DED1BD] rounded-lg transition-colors cursor-pointer"
          >
            Mua Bản Quyền
          </button>
        </div>
      </div>
    </div>
  );
};
