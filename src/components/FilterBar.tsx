import React from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { Category, ArtStyle, PriceRange } from '../types';

interface FilterBarProps {
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  selectedStyle: ArtStyle;
  onSelectStyle: (style: ArtStyle) => void;
  selectedLicense: 'all' | 'personal' | 'commercial';
  onSelectLicense: (license: 'all' | 'personal' | 'commercial') => void;
  priceRange: PriceRange;
  onSelectPriceRange: (range: PriceRange) => void;
  statusFilter: 'all' | 'available' | 'sold';
  onSelectStatus: (status: 'all' | 'available' | 'sold') => void;
  totalCount: number;
  onResetFilters: () => void;
  isSoftFiltered?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedStyle,
  onSelectStyle,
  selectedLicense,
  onSelectLicense,
  priceRange,
  onSelectPriceRange,
  statusFilter,
  onSelectStatus,
  totalCount,
  onResetFilters,
  isSoftFiltered,
}) => {
  const categories: { label: Category; icon: string }[] = [
    { label: 'Tất cả', icon: '🌟' },
    { label: 'Sticker & Decal', icon: '✨' },
    { label: 'Áo thun & Apparel', icon: '👕' },
    { label: 'Logo & Brand Identity', icon: '🏷️' },
    { label: 'Washi Tape & Stationery', icon: '📒' },
    { label: 'Phone Case & Phụ kiện', icon: '📱' },
    { label: 'Poster & Decor', icon: '🖼️' },
  ];

  const styles: ArtStyle[] = [
    'Tất cả',
    'Anime & Chibi',
    'Indie & Y2K',
    'Tối giản (Minimalist)',
    'Doodle & Nét cọ tay',
    'Retro & Vintage',
    'Cyberpunk & Neon',
  ];

  const hasActiveFilters = 
    selectedCategory !== 'Tất cả' ||
    selectedStyle !== 'Tất cả' ||
    selectedLicense !== 'all' ||
    priceRange !== 'all' ||
    statusFilter !== 'all';

  return (
    <div className="bg-[#FAF6F2]/95 border-b border-[#DED1BD] py-3.5 sticky top-20 z-30 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        
        {/* Row 1: Primary Category Segmented Control with Youth Icons */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 bg-[#DED1BD]/40 rounded-xl overflow-x-auto scrollbar-none max-w-full">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => onSelectCategory(cat.label)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-[#683B2B] shadow-xs border border-[#DED1BD]/60'
                      : 'text-[#683B2B]/75 hover:text-[#683B2B] hover:bg-white/40'
                  }`}
                >
                  <span className="text-[12px]">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-[#683B2B]/75 shrink-0 font-sans hidden lg:flex items-center gap-2">
            <span>Hiển thị</span>
            <span className="font-semibold text-[#683B2B] px-2 py-0.5 rounded bg-white border border-[#DED1BD] tabular-nums">
              {totalCount} thiết kế
            </span>
            {isSoftFiltered && (
              <span className="inline-flex items-center gap-1 text-[11px] text-[#B08401] bg-[#B08401]/10 px-2 py-0.5 rounded font-medium">
                <Sparkles className="w-3 h-3" /> Gợi ý tương tự
              </span>
            )}
          </div>
        </div>

        {/* Row 2: Secondary Refinements (Style, License, Micro-Price, Status) */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 border-t border-[#DED1BD]/50 text-xs text-[#683B2B]">
          
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Style Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#683B2B]/60 font-medium">Phong cách:</span>
              <select
                value={selectedStyle}
                onChange={(e) => onSelectStyle(e.target.value as ArtStyle)}
                className="bg-white border border-[#DED1BD] rounded-lg px-2.5 py-1 text-xs text-[#683B2B] focus:outline-none focus:border-[#B08401] cursor-pointer shadow-2xs hover:border-[#B08401]/60 transition-colors"
              >
                {styles.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* License Purpose (Tailored for POD Shops & Personal Use) */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#683B2B]/60 font-medium">Mục đích:</span>
              <select
                value={selectedLicense}
                onChange={(e) => onSelectLicense(e.target.value as any)}
                className="bg-white border border-[#DED1BD] rounded-lg px-2.5 py-1 text-xs text-[#683B2B] focus:outline-none focus:border-[#B08401] cursor-pointer shadow-2xs hover:border-[#B08401]/60 transition-colors"
              >
                <option value="all">Mọi loại bản quyền</option>
                <option value="personal">👤 Dùng cá nhân (In riêng, dán sổ, decor)</option>
                <option value="commercial">🏢 Shop POD (In áo, sticker bán lẻ hợp pháp)</option>
              </select>
            </div>

            {/* Micro-transactions Price Range (30k - 500k) */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#683B2B]/60 font-medium">Khoảng giá:</span>
              <select
                value={priceRange}
                onChange={(e) => onSelectPriceRange(e.target.value as PriceRange)}
                className="bg-white border border-[#DED1BD] rounded-lg px-2.5 py-1 text-xs text-[#683B2B] focus:outline-none focus:border-[#B08401] cursor-pointer shadow-2xs hover:border-[#B08401]/60 transition-colors"
              >
                <option value="all">Mọi mức giá (30k - 500k)</option>
                <option value="under50k">Dưới 50.000 ₫ (Hạt dẻ / Sticker)</option>
                <option value="50k-150k">50.000 ₫ - 150.000 ₫ (Decor & Washi)</option>
                <option value="above150k">Trên 150.000 ₫ (Áo thun & Logo)</option>
              </select>
            </div>

            {/* Reset Button when filters are modified */}
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-[#B08401] hover:text-[#683B2B] hover:bg-[#DED1BD]/30 transition-all cursor-pointer border border-dashed border-[#B08401]/50"
                title="Xóa tất cả bộ lọc"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Đặt lại</span>
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 p-0.5 bg-[#DED1BD]/40 rounded-lg">
            <button
              onClick={() => onSelectStatus('all')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-white text-[#683B2B] shadow-xs'
                  : 'text-[#683B2B]/70 hover:text-[#683B2B]'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => onSelectStatus('available')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                statusFilter === 'available'
                  ? 'bg-white text-[#683B2B] shadow-xs'
                  : 'text-[#683B2B]/70 hover:text-[#683B2B]'
              }`}
            >
              Sẵn sàng tải file
            </button>
            <button
              onClick={() => onSelectStatus('sold')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                statusFilter === 'sold'
                  ? 'bg-white text-[#683B2B] shadow-xs'
                  : 'text-[#683B2B]/70 hover:text-[#683B2B]'
              }`}
            >
              Đã bán độc quyền
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
