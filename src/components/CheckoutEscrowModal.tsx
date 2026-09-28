import React, { useState } from 'react';
import { X, ShieldCheck, QrCode, CreditCard, Wallet, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { Artwork, LicenseType, OwnedArtwork, User } from '../types';

interface CheckoutEscrowModalProps {
  artwork: Artwork | null;
  licenseType: LicenseType;
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onPaymentSuccess: (purchased: OwnedArtwork) => void;
  onRequireAuth: () => void;
}

export const CheckoutEscrowModal: React.FC<CheckoutEscrowModalProps> = ({
  artwork,
  licenseType,
  isOpen,
  onClose,
  currentUser,
  onPaymentSuccess,
  onRequireAuth,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'card' | 'balance'>('qr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 8899');
  const [isAgreed, setIsAgreed] = useState(true);

  if (!isOpen || !artwork) return null;

  const price = licenseType === 'personal' ? artwork.personalPrice : artwork.commercialPrice;

  const handleConfirmPayment = () => {
    if (!currentUser) {
      onRequireAuth();
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newOwned: OwnedArtwork = {
        orderId: `ORD-${Date.now().toString().slice(-6)}`,
        artworkId: artwork.id,
        artworkTitle: artwork.title,
        artistName: artwork.artistName,
        imageUrl: artwork.imageUrl,
        licenseType: licenseType,
        pricePaid: price,
        purchaseDate: new Date().toISOString().split('T')[0],
        certificateHash: `ARTFAIR-CERT-0x${Math.random().toString(16).substring(2, 10).toUpperCase()}-2026`,
        deliverables: artwork.deliverables,
      };

      onPaymentSuccess(newOwned);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#FAF6F2] border border-[#DED1BD] rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DED1BD] bg-[#FAF6F2]">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold text-[#683B2B]">ARTFAIR Ký Quỹ Escrow</span>
            <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300">
              Bảo hộ 100%
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#683B2B]/60 hover:text-[#683B2B] hover:bg-[#DED1BD]/40 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          
          {/* Order Summary Item */}
          <div className="flex items-center gap-3.5 p-3.5 bg-white border border-[#DED1BD] rounded-xl">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-16 h-16 object-cover rounded-lg border border-[#DED1BD]"
            />
            <div className="flex-1">
              <h4 className="font-serif text-sm font-bold text-[#683B2B] line-clamp-1">
                {artwork.title}
              </h4>
              <p className="text-xs text-[#683B2B]/70">{artwork.artistName}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#FAF6F2] text-[#B08401] border border-[#DED1BD]">
                  {licenseType === 'personal' ? '👤 Bản Quyền Cá Nhân' : '🏢 Bản Quyền Thương Mại'}
                </span>
                <span className="text-[10px] text-[#683B2B]/60">300 DPI File Gốc</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-serif text-base font-bold text-[#683B2B] tabular-nums">
                {price.toLocaleString('vi-VN')} ₫
              </span>
            </div>
          </div>

          {/* Escrow Mechanism Explanation */}
          <div className="p-3 bg-[#D49E8D]/15 border border-[#DED1BD] rounded-xl flex items-start gap-2.5 text-xs text-[#683B2B]">
            <ShieldCheck className="w-5 h-5 text-[#B08401] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-bold">Cơ chế bảo vệ ký quỹ người mua</p>
              <p className="text-[11px] text-[#683B2B]/80 leading-relaxed">
                Khoản thanh toán được phong tỏa trong quỹ ủy thác trung gian ARTFAIR Escrow. Sau khi bấm thanh toán, bạn nhận ngay quyền truy cập file gốc và chứng nhận bản quyền số.
              </p>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#683B2B] mb-2">
              Chọn Phương Thức Thanh Toán
            </label>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('qr')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'qr'
                    ? 'bg-white border-[#B08401] ring-1 ring-[#B08401] shadow-xs'
                    : 'bg-white/60 border-[#DED1BD] hover:border-[#B08401]/60'
                }`}
              >
                <QrCode className="w-4 h-4 mx-auto text-[#B08401] mb-1" />
                <span className="text-[11px] font-semibold text-[#683B2B] block">QR Napas 24/7</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-white border-[#B08401] ring-1 ring-[#B08401] shadow-xs'
                    : 'bg-white/60 border-[#DED1BD] hover:border-[#B08401]/60'
                }`}
              >
                <CreditCard className="w-4 h-4 mx-auto text-[#B08401] mb-1" />
                <span className="text-[11px] font-semibold text-[#683B2B] block">Visa / Master</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('balance')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'balance'
                    ? 'bg-white border-[#B08401] ring-1 ring-[#B08401] shadow-xs'
                    : 'bg-white/60 border-[#DED1BD] hover:border-[#B08401]/60'
                }`}
              >
                <Wallet className="w-4 h-4 mx-auto text-[#B08401] mb-1" />
                <span className="text-[11px] font-semibold text-[#683B2B] block">Số Dư Sàn</span>
              </button>
            </div>

            {/* Method Content */}
            <div className="mt-3 p-3.5 bg-white border border-[#DED1BD] rounded-xl text-xs">
              {paymentMethod === 'qr' && (
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-stone-900 rounded-lg p-1.5 flex items-center justify-center shrink-0">
                    <div className="grid grid-cols-4 gap-1 w-full h-full p-1 bg-white rounded text-[7px] text-center font-mono">
                      <span>■</span><span>□</span><span>■</span><span>■</span>
                      <span>□</span><span>■</span><span>□</span><span>■</span>
                      <span>■</span><span>■</span><span>■</span><span>□</span>
                      <span>■</span><span>□</span><span>■</span><span>■</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-[#683B2B]">
                    <p className="font-bold">Quét mã VietQR chuyển khoản tức thì</p>
                    <p className="text-[11px] text-[#683B2B]/70">
                      Ngân hàng: <strong>Vietcombank (Escrow Trust Account)</strong>
                    </p>
                    <p className="text-[11px] text-[#683B2B]/70">
                      Chủ tài khoản: <strong>ARTFAIR ESCROW VIETNAM</strong>
                    </p>
                    <p className="text-[10px] text-[#B08401] font-mono">
                      Nội dung: ARTFAIR {artwork.id.slice(-6).toUpperCase()}
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-[#683B2B]/70">Thẻ thanh toán quốc tế</span>
                    <span className="font-semibold text-emerald-700">3D Secure Protected</span>
                  </div>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#FAF6F2] border border-[#DED1BD] rounded-lg font-mono text-xs text-[#683B2B]"
                  />
                </div>
              )}

              {paymentMethod === 'balance' && (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#683B2B]/70 block">Số dư tài khoản ARTFAIR:</span>
                    <span className="font-serif text-sm font-bold text-[#B08401]">
                      {currentUser ? currentUser.balance.toLocaleString('vi-VN') : '0'} ₫
                    </span>
                  </div>
                  <span className="text-emerald-700 text-[11px] font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Khả dụng để thanh toán
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Calculation Breakdown */}
          <div className="p-3 bg-white/60 border border-[#DED1BD] rounded-xl text-xs space-y-1.5 font-sans">
            <div className="flex justify-between text-[#683B2B]/70">
              <span>Giá bản quyền niêm yết:</span>
              <span className="font-serif font-medium text-[#683B2B] tabular-nums">
                {price.toLocaleString('vi-VN')} ₫
              </span>
            </div>
            <div className="flex justify-between text-[#683B2B]/70">
              <span>Phí ủy thác Escrow & Chứng thực bản quyền số:</span>
              <span className="text-emerald-700 font-medium">Miễn phí (0 ₫)</span>
            </div>
            <div className="pt-1.5 border-t border-[#DED1BD] flex justify-between font-bold text-[#683B2B] text-sm">
              <span>Tổng thanh toán thực tế:</span>
              <span className="font-serif text-base text-[#B08401] tabular-nums">
                {price.toLocaleString('vi-VN')} ₫
              </span>
            </div>
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-2 text-xs text-[#683B2B]/80 cursor-pointer">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mt-0.5 rounded text-[#B08401] focus:ring-[#B08401]"
            />
            <span>
              Tôi đồng ý kích hoạt ký quỹ Escrow và nhận quyền sở hữu bản quyền {licenseType === 'personal' ? 'Cá nhân' : 'Thương mại'} vĩnh viễn.
            </span>
          </label>

          {/* Confirm Button */}
          <button
            type="button"
            disabled={!isAgreed || isProcessing}
            onClick={handleConfirmPayment}
            className="w-full py-3 text-xs sm:text-sm font-semibold tracking-wider text-white bg-[#B08401] hover:bg-[#977000] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span>Đang kết nối cổng Escrow...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Xác Nhận Ký Quỹ & Mua Bản Quyền</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
