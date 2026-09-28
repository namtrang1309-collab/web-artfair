import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Sparkles, Check, ArrowRight, ArrowLeft, Shield, AlertCircle, X, Layers } from 'lucide-react';
import { Artwork, Category, ArtStyle } from '../types';
import { artworkSolitudeImg } from '../data/mockData';

interface CreatorStudioProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishArtwork: (newArtwork: Artwork) => void;
  creatorName?: string;
  creatorAvatar?: string;
}

export const CreatorStudio: React.FC<CreatorStudioProps> = ({
  isOpen,
  onClose,
  onPublishArtwork,
  creatorName = 'Linh Đan (Atelier Linh)',
  creatorAvatar = artworkSolitudeImg,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Upload & Auto-Mockup
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileResolution, setFileResolution] = useState<string>('300 DPI');
  const [mockupPreviewType, setMockupPreviewType] = useState<'canvas' | 'tshirt' | 'phonecase' | 'totebag'>('canvas');

  // Step 2: Metadata
  const [title, setTitle] = useState('');
  const [inspiration, setInspiration] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Exclude<Category, 'Tất cả'>>('Sticker & Decal');
  const [style, setStyle] = useState<Exclude<ArtStyle, 'Tất cả'>>('Anime & Chibi');
  const [dimensions, setDimensions] = useState('3000 x 3000 px / In A5 (Vector / 300 DPI)');
  const [colorProfile, setColorProfile] = useState('CMYK & sRGB chuẩn in ấn');
  const [deliverableFormats, setDeliverableFormats] = useState<string[]>([
    '.PNG 300 DPI (Tách nền trong suốt)',
    '.AI / .PSD Layered Source',
    'Chứng nhận bản quyền PDF'
  ]);

  // Step 3: Commercial Setup
  const [personalPrice, setPersonalPrice] = useState<number>(45000); // 45.000 ₫
  const [commercialPrice, setCommercialPrice] = useState<number>(120000); // 120.000 ₫
  const [autoWatermark, setAutoWatermark] = useState<boolean>(true);
  const [copyrightPledge, setCopyrightPledge] = useState<boolean>(false);
  const [editionTotal, setEditionTotal] = useState<number>(50);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseSampleImage = () => {
    setUploadedImage(artworkSolitudeImg);
    setFileName('Masterpiece_HighRes_300DPI.png');
  };

  const handleStep1Next = () => {
    if (!uploadedImage) {
      setErrorMessage('Vui lòng tải lên file tác phẩm nghệ thuật hoặc chọn ảnh mẫu.');
      return;
    }
    setErrorMessage(null);
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    if (!title.trim()) {
      setErrorMessage('Vui lòng nhập tiêu đề tác phẩm.');
      return;
    }
    if (!inspiration.trim()) {
      setErrorMessage('Vui lòng chia sẻ cảm hứng sáng tác của bạn.');
      return;
    }
    setErrorMessage(null);
    setCurrentStep(3);
  };

  const handleFinalPublish = () => {
    if (!copyrightPledge) {
      setErrorMessage('Bạn bắt buộc phải xác nhận cam kết bản quyền chính chủ 100%.');
      return;
    }
    if (personalPrice <= 0 || commercialPrice <= 0) {
      setErrorMessage('Mức giá niêm yết phải lớn hơn 0.');
      return;
    }

    const newArtwork: Artwork = {
      id: `art-created-${Date.now()}`,
      title: title.trim(),
      artistId: 'artist-001',
      artistName: creatorName,
      artistAvatar: creatorAvatar,
      artistRating: 5.0,
      imageUrl: uploadedImage || artworkSolitudeImg,
      category,
      style,
      personalPrice: Number(personalPrice),
      commercialPrice: Number(commercialPrice),
      isSoldOut: false,
      editionTotal: Number(editionTotal),
      editionRemaining: Number(editionTotal),
      likes: 1,
      createdAt: new Date().toISOString().split('T')[0],
      description: description.trim() || 'Tác phẩm độc bản mới được họa sĩ niêm yết trên sàn ARTFAIR.',
      inspiration: inspiration.trim(),
      dimensions,
      resolution: '300 DPI Ultra High-Res',
      deliverables: deliverableFormats,
      colorProfile,
      hasWatermark: autoWatermark,
      views: 12,
    };

    onPublishArtwork(newArtwork);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#FAF6F2] border border-[#DED1BD] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DED1BD] bg-[#FAF6F2] shrink-0">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#683B2B]">
              Creator Studio · Đăng Bán Tác Phẩm & Định Giá Bản Quyền
            </h2>
            <p className="text-xs text-[#683B2B]/70">
              Quy trình chuẩn hóa 3 bước để niêm yết tranh lên sàn nghệ thuật ARTFAIR
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full border border-[#DED1BD] bg-white text-[#683B2B] hover:bg-[#DED1BD]/40 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="px-6 py-3 bg-white/60 border-b border-[#DED1BD] shrink-0">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className={`flex items-center gap-2 pb-1 border-b-2 ${
              currentStep === 1 ? 'border-[#B08401] text-[#683B2B] font-bold' : 'border-transparent text-[#683B2B]/50'
            }`}>
              <span className="w-5 h-5 rounded-full bg-[#FAF6F2] border border-[#DED1BD] flex items-center justify-center text-[11px] font-mono">1</span>
              <span>Tải File Gốc & Auto-Mockup</span>
            </div>
            <div className={`flex items-center gap-2 pb-1 border-b-2 ${
              currentStep === 2 ? 'border-[#B08401] text-[#683B2B] font-bold' : 'border-transparent text-[#683B2B]/50'
            }`}>
              <span className="w-5 h-5 rounded-full bg-[#FAF6F2] border border-[#DED1BD] flex items-center justify-center text-[11px] font-mono">2</span>
              <span>Metadata & Câu Chuyện</span>
            </div>
            <div className={`flex items-center gap-2 pb-1 border-b-2 ${
              currentStep === 3 ? 'border-[#B08401] text-[#683B2B] font-bold' : 'border-transparent text-[#683B2B]/50'
            }`}>
              <span className="w-5 h-5 rounded-full bg-[#FAF6F2] border border-[#DED1BD] flex items-center justify-center text-[11px] font-mono">3</span>
              <span>Định Giá Hai Gói & Bản Quyền</span>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Upload & Auto-Mockup Generator */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Upload Drag & Drop Area */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#683B2B] mb-2">
                    Tải lên file gốc chất lượng cao (.PNG, .TIFF, .PSD)
                  </h3>
                  
                  <div className="relative border-2 border-dashed border-[#DED1BD] hover:border-[#B08401] rounded-2xl p-6 bg-white/70 text-center transition-all flex flex-col items-center justify-center min-h-[260px] group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />

                    {uploadedImage ? (
                      <div className="space-y-2">
                        <img
                          src={uploadedImage}
                          alt="Uploaded Preview"
                          className="max-h-40 mx-auto rounded-lg shadow-sm border border-[#DED1BD] object-contain"
                        />
                        <p className="text-xs font-medium text-[#683B2B]">{fileName || 'Tác phẩm của bạn'}</p>
                        <p className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block font-mono">
                          ✓ Đạt chuẩn 300 DPI · In khổ lớn hợp lệ
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-12 h-12 mx-auto rounded-full bg-[#B08401]/10 flex items-center justify-center text-[#B08401] group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-semibold text-[#683B2B]">
                          Kéo thả file tranh gốc hoặc bấm để chọn tệp
                        </p>
                        <p className="text-[11px] text-[#683B2B]/60 max-w-xs">
                          Khuyến nghị file độ phân giải tối thiểu 4000x3000px, 300 DPI, hỗ trợ hệ màu RGB & CMYK.
                        </p>
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUseSampleImage();
                            }}
                            className="px-3 py-1.5 text-xs text-[#B08401] border border-[#B08401] hover:bg-[#B08401] hover:text-white rounded-lg transition-colors cursor-pointer"
                          >
                            Dùng thử mẫu tranh nghệ thuật có sẵn
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Auto-Mockup Generator Preview */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#683B2B] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#B08401]" />
                      <span>Công Cụ Tự Động Tạo Mockup Sản Phẩm</span>
                    </h3>
                    <span className="text-[10px] text-[#B08401] bg-white px-2 py-0.5 rounded border border-[#DED1BD]">
                      Auto-Generator
                    </span>
                  </div>

                  {/* Mockup switcher buttons */}
                  <div className="flex gap-1 mb-2 bg-[#DED1BD]/40 p-1 rounded-lg">
                    {(['canvas', 'tshirt', 'phonecase', 'totebag'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setMockupPreviewType(type)}
                        className={`flex-1 py-1 text-[11px] font-medium rounded transition-all cursor-pointer ${
                          mockupPreviewType === type ? 'bg-white text-[#683B2B] shadow-xs' : 'text-[#683B2B]/70'
                        }`}
                      >
                        {type === 'canvas' && 'Khung Canvas'}
                        {type === 'tshirt' && 'Áo Thun'}
                        {type === 'phonecase' && 'Ốp Lưng'}
                        {type === 'totebag' && 'Túi Vải'}
                      </button>
                    ))}
                  </div>

                  {/* Rendered Mockup Preview Frame */}
                  <div className="border border-[#DED1BD] rounded-2xl bg-[#EBE4DC] aspect-4/3 flex items-center justify-center p-4 relative overflow-hidden">
                    {uploadedImage ? (
                      mockupPreviewType === 'canvas' ? (
                        <div className="p-3 bg-[#382618] rounded shadow-xl border border-[#B08401]/30 max-h-[85%]">
                          <img
                            src={uploadedImage}
                            alt="Mockup Canvas"
                            className="max-h-40 object-contain shadow-inner"
                          />
                        </div>
                      ) : mockupPreviewType === 'tshirt' ? (
                        <div className="relative w-44 h-48 flex items-center justify-center">
                          <svg className="w-full h-full text-white" viewBox="0 0 240 260" fill="currentColor">
                            <path d="M75 15 C85 35 155 35 165 15 L225 45 L195 85 L170 70 L170 245 C170 250 165 255 160 255 L80 255 C75 255 70 250 70 245 L70 70 L45 85 L15 45 Z" fill="#F4EFEA" stroke="#DED1BD" strokeWidth="2" />
                          </svg>
                          <div className="absolute top-12 w-20 aspect-3/4 overflow-hidden rounded opacity-85 mix-blend-multiply">
                            <img src={uploadedImage} alt="T-shirt" className="w-full h-full object-cover" />
                          </div>
                        </div>
                      ) : mockupPreviewType === 'phonecase' ? (
                        <div className="w-28 h-48 rounded-[24px] bg-stone-900 p-1.5 shadow-xl ring-2 ring-stone-700 relative overflow-hidden">
                          <div className="absolute top-2 left-2 w-8 h-9 bg-stone-800 rounded-lg z-10 border border-stone-600"></div>
                          <img src={uploadedImage} alt="Case" className="w-full h-full object-cover rounded-[18px]" />
                        </div>
                      ) : (
                        <div className="relative w-36 h-48 flex flex-col items-center justify-end">
                          <div className="w-20 h-16 border-4 border-[#C9B8A2] rounded-t-full"></div>
                          <div className="w-32 h-36 bg-[#E6DAC8] border border-[#D5C2AB] rounded-b-lg shadow-md flex items-center justify-center p-2">
                            <img src={uploadedImage} alt="Tote" className="w-20 aspect-4/3 object-cover rounded mix-blend-multiply" />
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="text-center text-[#683B2B]/50 p-6">
                        <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-xs">Mockup sẽ tự động hiển thị ngay sau khi bạn tải ảnh lên.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 2: Metadata & Story */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#683B2B] mb-1">
                  Tiêu đề tác phẩm <span className="text-[#B08401]">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Vòm Cung Hoàng Kim (Golden Arches)"
                  className="w-full px-3 py-2 bg-white border border-[#DED1BD] rounded-lg text-xs text-[#683B2B] focus:outline-none focus:border-[#B08401]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#683B2B] mb-1">
                  Cảm hứng sáng tác & Tự sự nghệ sĩ <span className="text-[#B08401]">*</span>
                </label>
                <textarea
                  rows={3}
                  value={inspiration}
                  onChange={(e) => setInspiration(e.target.value)}
                  placeholder="Kể về bối cảnh, chất liệu, triết lý hoặc xúc cảm khởi nguồn tác phẩm..."
                  className="w-full px-3 py-2 bg-white border border-[#DED1BD] rounded-lg text-xs text-[#683B2B] focus:outline-none focus:border-[#B08401]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#683B2B] mb-1">Danh mục</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-[#DED1BD] rounded-lg text-xs text-[#683B2B] focus:outline-none focus:border-[#B08401]"
                  >
                    <option value="Sticker & Decal">Sticker & Decal</option>
                    <option value="Áo thun & Apparel">Áo thun & Apparel</option>
                    <option value="Logo & Brand Identity">Logo & Brand Identity</option>
                    <option value="Washi Tape & Stationery">Washi Tape & Stationery</option>
                    <option value="Phone Case & Phụ kiện">Phone Case & Phụ kiện</option>
                    <option value="Poster & Decor">Poster & Decor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#683B2B] mb-1">Phong cách</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-[#DED1BD] rounded-lg text-xs text-[#683B2B] focus:outline-none focus:border-[#B08401]"
                  >
                    <option value="Anime & Chibi">Anime & Chibi</option>
                    <option value="Indie & Y2K">Indie & Y2K</option>
                    <option value="Tối giản (Minimalist)">Tối giản (Minimalist)</option>
                    <option value="Doodle & Nét cọ tay">Doodle & Nét cọ tay</option>
                    <option value="Retro & Vintage">Retro & Vintage</option>
                    <option value="Cyberpunk & Neon">Cyberpunk & Neon</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#683B2B] mb-1">Kích thước gốc / Độ phân giải</label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#DED1BD] rounded-lg text-xs text-[#683B2B] focus:outline-none focus:border-[#B08401]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#683B2B] mb-1">Hệ màu bàn giao</label>
                  <input
                    type="text"
                    value={colorProfile}
                    onChange={(e) => setColorProfile(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#DED1BD] rounded-lg text-xs text-[#683B2B] focus:outline-none focus:border-[#B08401]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Commercial Setup & Pricing */}
          {currentStep === 3 && (
            <div className="space-y-5">
              {/* Dual Licensing Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Personal License Price */}
                <div className="p-4 bg-white border border-[#DED1BD] rounded-xl space-y-2">
                  <span className="text-xs font-bold text-[#683B2B] block">
                    👤 Mức giá: Bản Quyền Cá Nhân (VND)
                  </span>
                  <p className="text-[11px] text-[#683B2B]/60 leading-tight">
                    Dành cho bạn trẻ tải in riêng, dán sổ, dán laptop, decor phòng học.
                  </p>
                  <div className="relative">
                    <input
                      type="number"
                      value={personalPrice}
                      onChange={(e) => setPersonalPrice(Number(e.target.value))}
                      className="w-full pl-3 pr-8 py-2 bg-[#FAF6F2] border border-[#DED1BD] rounded-lg text-sm font-bold text-[#683B2B] focus:outline-none focus:border-[#B08401]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#683B2B]/60">₫</span>
                  </div>
                </div>

                {/* Commercial License Price */}
                <div className="p-4 bg-white border border-[#DED1BD] rounded-xl space-y-2">
                  <span className="text-xs font-bold text-[#683B2B] block">
                    🏢 Mức giá: Bản Quyền Shop POD (VND)
                  </span>
                  <p className="text-[11px] text-[#683B2B]/60 leading-tight">
                    Cấp quyền Shop kinh doanh in ấn lên tới 10.000 sản phẩm áo thun, sticker, ốp lưng.
                  </p>
                  <div className="relative">
                    <input
                      type="number"
                      value={commercialPrice}
                      onChange={(e) => setCommercialPrice(Number(e.target.value))}
                      className="w-full pl-3 pr-8 py-2 bg-[#FAF6F2] border border-[#DED1BD] rounded-lg text-sm font-bold text-[#683B2B] focus:outline-none focus:border-[#B08401]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#683B2B]/60">₫</span>
                  </div>
                </div>
              </div>

              {/* Watermark Toggle */}
              <div className="p-3 bg-white border border-[#DED1BD] rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#683B2B]">Tự động phủ Watermark chống tải trộm</p>
                  <p className="text-[11px] text-[#683B2B]/70">
                    Hệ thống sẽ chèn watermark mờ bảo vệ hình ảnh hiển thị trên trang chủ và chặn lưu chuột phải.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoWatermark}
                    onChange={(e) => setAutoWatermark(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B08401]"></div>
                </label>
              </div>

              {/* Copyright Pledge Mandatory Checkbox */}
              <div className="p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-xl space-y-2">
                <label className="flex items-start gap-2.5 text-xs text-[#683B2B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={copyrightPledge}
                    onChange={(e) => setCopyrightPledge(e.target.checked)}
                    className="mt-0.5 rounded text-[#B08401] focus:ring-[#B08401]"
                  />
                  <div>
                    <span className="font-bold text-[#683B2B]">
                      Cam kết bản quyền tác giả chính chủ 100% <span className="text-[#B08401]">*</span>
                    </span>
                    <p className="text-[11px] text-[#683B2B]/80 mt-0.5 leading-relaxed">
                      Tôi xác nhận tác phẩm này là do tôi tự sáng tác, không sao chép trái phép, không vi phạm quyền sở hữu trí tuệ của bên thứ ba và sẵn sàng chịu trách nhiệm pháp lý theo điều khoản sàn ARTFAIR.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="px-6 py-4 border-t border-[#DED1BD] bg-[#FAF6F2] flex items-center justify-between shrink-0">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => (prev - 1) as any)}
              className="px-4 py-2 text-xs font-semibold text-[#683B2B] border border-[#DED1BD] rounded-lg hover:bg-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại</span>
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={currentStep === 1 ? handleStep1Next : handleStep2Next}
              className="px-5 py-2 text-xs font-semibold text-white bg-[#683B2B] hover:bg-[#B08401] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span>Tiếp tục</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalPublish}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#B08401] hover:bg-[#977000] rounded-lg transition-colors cursor-pointer flex items-center gap-2 shadow-md"
            >
              <Shield className="w-4 h-4" />
              <span>Đăng Bán Lên Sàn ARTFAIR</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
