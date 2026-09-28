import React from 'react';
import { X, Award, Download, Printer, CheckCircle2, Shield, QrCode } from 'lucide-react';
import { OwnedArtwork } from '../types';

interface CertificateModalProps {
  artwork: OwnedArtwork | null;
  isOpen: boolean;
  onClose: () => void;
  buyerName: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  artwork,
  isOpen,
  onClose,
  buyerName,
}) => {
  if (!isOpen || !artwork) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    alert(`Đang khởi tạo tệp PDF bản quyền có đóng dấu niêm phong điện tử cho chứng chỉ #${artwork.certificateHash}...`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF6F2] border-4 border-[#B08401]/40 rounded-2xl shadow-2xl overflow-hidden my-auto p-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Certificate Outer Frame */}
        <div className="border border-[#B08401] rounded-xl p-6 sm:p-8 bg-[#FAF6F2] relative">
          
          {/* Close button top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#683B2B]/60 hover:text-[#683B2B] hover:bg-[#DED1BD]/40 cursor-pointer print:hidden"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 text-[#B08401]/60 text-xs font-serif">✦</div>
          <div className="absolute top-2 right-2 text-[#B08401]/60 text-xs font-serif">✦</div>
          <div className="absolute bottom-2 left-2 text-[#B08401]/60 text-xs font-serif">✦</div>
          <div className="absolute bottom-2 right-2 text-[#B08401]/60 text-xs font-serif">✦</div>

          {/* Certificate Header */}
          <div className="text-center space-y-2 pb-6 border-b border-[#DED1BD]">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#B08401]/10 flex items-center justify-center text-[#B08401]">
              <Award className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-mono tracking-widest text-[#B08401] uppercase font-bold block">
              ARTFAIR OFFICIAL REGISTRY OF FINE ARTS
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-[#683B2B]">
              CHỨNG NHẬN BẢN QUYỀN NGHỆ THUẬT SỐ
            </h1>
            <p className="text-xs text-[#683B2B]/70 font-sans max-w-md mx-auto">
              Giấy chứng nhận quyền sở hữu và cấp phép sử dụng tác phẩm nghệ thuật độc bản theo chuẩn mực bản quyền quốc tế.
            </p>
          </div>

          {/* Certificate Body */}
          <div className="py-6 space-y-6">
            
            {/* Artwork thumbnail & main title */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/70 p-4 rounded-xl border border-[#DED1BD]">
              <img
                src={artwork.imageUrl}
                alt={artwork.artworkTitle}
                className="w-24 h-24 object-cover rounded-lg border border-[#B08401]/40 shadow-xs"
              />
              <div className="text-center sm:text-left space-y-1">
                <span className="text-[10px] text-[#B08401] uppercase tracking-wider font-semibold">
                  Tác phẩm được bảo hộ
                </span>
                <h3 className="font-serif text-lg font-bold text-[#683B2B]">
                  {artwork.artworkTitle}
                </h3>
                <p className="text-xs text-[#683B2B]/80 font-sans">
                  Sáng tác bởi: <strong>{artwork.artistName}</strong>
                </p>
              </div>
            </div>

            {/* Ownership & License specifications grid */}
            <div className="grid grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-3 bg-white/60 border border-[#DED1BD] rounded-lg">
                <span className="text-[10px] text-[#683B2B]/60 uppercase tracking-wider block">
                  Chủ sở hữu cấp quyền
                </span>
                <p className="font-bold text-[#683B2B] text-sm mt-0.5">{buyerName || 'Nguyễn Trần Hải'}</p>
                <p className="text-[10px] text-[#683B2B]/70 mt-1">Định danh xác thực ID: #COL-2026-99</p>
              </div>

              <div className="p-3 bg-white/60 border border-[#DED1BD] rounded-lg">
                <span className="text-[10px] text-[#683B2B]/60 uppercase tracking-wider block">
                  Loại bản quyền cấp phép
                </span>
                <p className="font-bold text-[#B08401] text-sm mt-0.5">
                  {artwork.licenseType === 'commercial' ? 'Bản Quyền Thương Mại Độc Quyền' : 'Bản Quyền Sử Dụng Cá Nhân'}
                </p>
                <p className="text-[10px] text-[#683B2B]/70 mt-1">Thời hạn: Trọn đời (Perpetual)</p>
              </div>
            </div>

            {/* Cryptographic verification & seal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#EFE7DC]/50 rounded-xl border border-[#DED1BD]">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] text-[#683B2B]/60 uppercase tracking-wider block font-mono">
                  Mã băm chữ ký số (Cryptographic Hash)
                </span>
                <code className="text-xs font-mono font-bold text-[#B08401] bg-white px-2 py-0.5 rounded border border-[#DED1BD] inline-block">
                  {artwork.certificateHash}
                </code>
                <p className="text-[10px] text-[#683B2B]/70">
                  Ngày phát hành: {artwork.purchaseDate} · Xác thực qua mạng ARTFAIR Escrow
                </p>
              </div>

              {/* Simulated Seal / QR Stamp */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-14 h-14 bg-white p-1 rounded border border-[#B08401] flex items-center justify-center shadow-xs">
                  <div className="text-center">
                    <div className="grid grid-cols-3 gap-0.5 w-10 h-10 p-0.5 bg-stone-900 rounded text-white text-[6px] items-center justify-center font-mono">
                      <span>■■</span><span>□■</span><span>■■</span>
                      <span>■□</span><span>■■</span><span>□■</span>
                      <span>■■</span><span>■□</span><span>■■</span>
                    </div>
                  </div>
                </div>

                <div className="w-16 h-16 rounded-full border-2 border-[#B08401] flex flex-col items-center justify-center text-center p-1 text-[#B08401] rotate-[-12deg]">
                  <Shield className="w-4 h-4" />
                  <span className="text-[8px] font-bold tracking-tighter uppercase leading-none mt-0.5">
                    VERIFIED SEAL
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Action Buttons (Hidden when printing) */}
          <div className="pt-4 border-t border-[#DED1BD] flex items-center justify-end gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-semibold text-[#683B2B] bg-white border border-[#DED1BD] hover:bg-[#FAF6F2] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>In Chứng Nhận</span>
            </button>
            <button
              onClick={handleDownloadPdf}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#B08401] hover:bg-[#977000] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Tải PDF Bản Quyền (.PDF)</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
