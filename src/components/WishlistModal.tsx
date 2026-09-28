import React from 'react';
import { X, Heart, Eye, ArrowRight } from 'lucide-react';
import { Artwork } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistArtworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
  onRemoveFromWishlist: (artwork: Artwork) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistArtworks,
  onSelectArtwork,
  onRemoveFromWishlist,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF6F2] border border-[#DED1BD] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DED1BD] bg-[#FAF6F2]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-[#B08401] text-[#B08401]" />
            <h3 className="font-serif text-lg font-bold text-[#683B2B]">
              Danh Sách Yêu Thích Của Bạn ({wishlistArtworks.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#683B2B]/60 hover:text-[#683B2B] hover:bg-[#DED1BD]/40 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {wishlistArtworks.length === 0 ? (
            <div className="text-center py-12 text-[#683B2B]/60 text-xs space-y-2">
              <Heart className="w-8 h-8 mx-auto text-[#DED1BD]" />
              <p>Bạn chưa lưu tác phẩm nào vào danh sách yêu thích.</p>
              <p className="text-[11px]">Bấm vào biểu tượng trái tim trên các bức tranh để lưu lại.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#DED1BD]/50">
              {wishlistArtworks.map((art) => (
                <div key={art.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-14 h-14 object-cover rounded-xl border border-[#DED1BD]"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#683B2B]">{art.title}</h4>
                      <p className="text-xs text-[#683B2B]/70">{art.artistName}</p>
                      <p className="text-xs font-serif font-bold text-[#B08401] mt-0.5">
                        {art.personalPrice.toLocaleString('vi-VN')} ₫
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectArtwork(art);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-[#683B2B] hover:bg-[#B08401] rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem & Mua</span>
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(art)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Xóa"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
