import React, { useState } from 'react';
import { Download, Award, Clock, CheckCircle2, Shield, ArrowRight, DollarSign, Wallet, FileText, ChevronRight, Eye, RefreshCw, Send, Check } from 'lucide-react';
import { User, OwnedArtwork, CommissionOrder, CommissionStep, Artwork } from '../types';

interface DashboardHubProps {
  currentUser: User | null;
  initialTab?: 'collector' | 'creator';
  ownedArtworks: OwnedArtwork[];
  commissions: CommissionOrder[];
  onOpenCertificate: (artwork: OwnedArtwork) => void;
  onUpdateCommissionStep: (orderId: string, nextStep: CommissionStep) => void;
  onOpenStudio: () => void;
  userArtworks: Artwork[];
  onRequireAuth: () => void;
}

export const DashboardHub: React.FC<DashboardHubProps> = ({
  currentUser,
  initialTab = 'collector',
  ownedArtworks,
  commissions,
  onOpenCertificate,
  onUpdateCommissionStep,
  onOpenStudio,
  userArtworks,
  onRequireAuth,
}) => {
  const [activeTab, setActiveTab] = useState<'collector' | 'creator'>(initialTab);
  const [selectedCommission, setSelectedCommission] = useState<CommissionOrder | null>(
    commissions.length > 0 ? commissions[0] : null
  );

  // Withdrawal state
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(10000000);
  const [bankName, setBankName] = useState('Vietcombank');
  const [bankAccount, setBankAccount] = useState('1029384756');
  const [accountHolder, setAccountHolder] = useState('LINH DAN ATELIER');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const stepsList: { key: CommissionStep; label: string; desc: string }[] = [
    { key: 'deposit_escrow', label: '1. Đã Ký Quỹ Escrow', desc: 'Tiền cọc an toàn 100%' },
    { key: 'sketch_concept', label: '2. Phác Thảo Ý Tưởng', desc: 'Duyệt bố cục và đường nét' },
    { key: 'color_refinement', label: '3. Phối Màu & Chi Tiết', desc: 'Nghệ sĩ lên màu hoàn thiện' },
    { key: 'final_approval', label: '4. Nghiệm Thu Tác Phẩm', desc: 'Khách hàng thẩm định lần cuối' },
    { key: 'completed', label: '5. Bàn Giao File & Giải Ngân', desc: 'Tải file gốc .PSD và cấp phép' },
  ];

  const getStepIndex = (step: CommissionStep) => {
    return stepsList.findIndex((s) => s.key === step);
  };

  const handleDownloadDeliverable = (artwork: OwnedArtwork) => {
    alert(`Bắt đầu tải trọn bộ tệp gốc độ phân giải cao (Lossless 300 DPI .PNG + .PSD Master) cho tác phẩm "${artwork.artworkTitle}". Mã giao dịch: ${artwork.orderId}`);
  };

  const handleExecuteWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawSuccess(false);
      setShowWithdrawModal(false);
      alert(`Lệnh rút ${withdrawAmount.toLocaleString('vi-VN')} ₫ về tài khoản ${bankName} (${bankAccount}) đã được tiếp nhận và xử lý thành công!`);
    }, 1200);
  };

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Shield className="w-12 h-12 mx-auto text-[#B08401]" />
        <h2 className="font-serif text-2xl font-bold text-[#683B2B]">
          Đăng Nhập Để Truy Cập Hub Cá Nhân
        </h2>
        <p className="text-xs text-[#683B2B]/70 max-w-md mx-auto">
          Quản lý kho tranh sở hữu, theo dõi tiến độ đơn hàng commission theo thời gian thực và quản lý doanh thu sáng tác.
        </p>
        <button
          onClick={onRequireAuth}
          className="px-6 py-2.5 text-xs font-semibold text-white bg-[#B08401] hover:bg-[#977000] rounded-xl transition-colors cursor-pointer shadow-xs"
        >
          Đăng Nhập Ngay
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Profile Header & Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#DED1BD]">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-[#B08401]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-[#683B2B]">{currentUser.name}</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white text-[#B08401] border border-[#DED1BD]">
                {currentUser.role === 'creator' ? 'Họa Sĩ Đã Xác Minh' : 'Nhà Sưu Tập Nghệ Thuật'}
              </span>
            </div>
            <p className="text-xs text-[#683B2B]/70 mt-0.5 font-sans">
              Tài khoản xác thực Escrow: <code className="font-mono text-[#B08401]">{currentUser.id}</code>
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#DED1BD]/40 rounded-xl">
          <button
            onClick={() => setActiveTab('collector')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'collector'
                ? 'bg-white text-[#683B2B] shadow-xs'
                : 'text-[#683B2B]/70 hover:text-[#683B2B]'
            }`}
          >
            Collector Hub (Bộ Sưu Tập & Tiến Độ)
          </button>
          <button
            onClick={() => setActiveTab('creator')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'creator'
                ? 'bg-white text-[#683B2B] shadow-xs'
                : 'text-[#683B2B]/70 hover:text-[#683B2B]'
            }`}
          >
            Creator Dashboard (Quản Lý Bán Tranh)
          </button>
        </div>
      </div>

      {/* VIEW 1: COLLECTOR HUB (Kho Tranh & Live Progress Tracker) */}
      {activeTab === 'collector' && (
        <div className="space-y-10">
          
          {/* Section A: Kho Tranh Đã Sở Hữu */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#683B2B]">
                  Kho Tranh Đã Sở Hữu & Giấy Chứng Nhận Bản Quyền
                </h2>
                <p className="text-xs text-[#683B2B]/70">
                  Tải xuống file gốc chất lượng cao (.PNG 300 DPI, .PSD) và giấy chứng nhận điện tử trọn đời
                </p>
              </div>
              <span className="text-xs font-mono font-semibold text-[#683B2B] bg-white px-2.5 py-1 rounded border border-[#DED1BD]">
                {ownedArtworks.length} tác phẩm
              </span>
            </div>

            {ownedArtworks.length === 0 ? (
              <div className="p-8 bg-white border border-[#DED1BD] rounded-2xl text-center text-[#683B2B]/60 text-xs">
                Bạn chưa sở hữu tác phẩm nào. Hãy khám phá phòng tranh và chọn tác phẩm yêu thích!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ownedArtworks.map((item) => (
                  <div
                    key={item.orderId}
                    className="p-4 bg-white border border-[#DED1BD] rounded-2xl shadow-xs flex flex-col sm:flex-row gap-4 justify-between"
                  >
                    <div className="flex gap-3.5">
                      <img
                        src={item.imageUrl}
                        alt={item.artworkTitle}
                        className="w-20 h-20 object-cover rounded-xl border border-[#DED1BD] shrink-0"
                      />
                      <div className="space-y-1">
                        <span className="text-[10px] text-[#B08401] font-semibold uppercase tracking-wider block">
                          Mã đơn: {item.orderId}
                        </span>
                        <h3 className="font-serif text-base font-bold text-[#683B2B] line-clamp-1">
                          {item.artworkTitle}
                        </h3>
                        <p className="text-xs text-[#683B2B]/70">{item.artistName}</p>
                        <div className="flex items-center gap-2 pt-1 text-[11px]">
                          <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {item.licenseType === 'commercial' ? 'Bản Quyền Thương Mại' : 'Bản Quyền Cá Nhân'}
                          </span>
                          <span className="text-[#683B2B]/60">{item.purchaseDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col justify-end gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#DED1BD]/50">
                      <button
                        onClick={() => handleDownloadDeliverable(item)}
                        className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold text-white bg-[#683B2B] hover:bg-[#B08401] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Tải File Gốc (300 DPI)</span>
                      </button>

                      <button
                        onClick={() => onOpenCertificate(item)}
                        className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold text-[#683B2B] bg-[#FAF6F2] hover:bg-white border border-[#DED1BD] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Award className="w-3.5 h-3.5 text-[#B08401]" />
                        <span>Xuất Chứng Nhận (PDF)</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section B: Trung Tâm Theo Dõi Tiến Độ (Live Progress Tracker) */}
          <div className="space-y-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#683B2B] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#B08401]" />
                <span>Trung Tâm Theo Dõi Tiến Độ Commission Thời Gian Thực</span>
              </h2>
              <p className="text-xs text-[#683B2B]/70">
                Thanh tiến trình trực quan minh bạch theo chuẩn mực giao dịch ủy thác bảo hộ Escrow
              </p>
            </div>

            {commissions.length === 0 ? (
              <div className="p-8 bg-white border border-[#DED1BD] rounded-2xl text-center text-[#683B2B]/60 text-xs">
                Hiện tại bạn không có đơn commission nào đang xử lý.
              </div>
            ) : (
              <div className="space-y-6">
                {commissions.map((comm) => {
                  const currentIdx = getStepIndex(comm.currentStep);

                  return (
                    <div
                      key={comm.id}
                      className="bg-white border border-[#DED1BD] rounded-2xl p-6 shadow-xs space-y-6"
                    >
                      {/* Commission Title & Status Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DED1BD]/70">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-[#B08401] bg-[#FAF6F2] px-2 py-0.5 rounded border border-[#DED1BD]">
                              {comm.id}
                            </span>
                            <span className="text-xs text-[#683B2B]/70">
                              Hạn bàn giao: <strong>{comm.deadline}</strong>
                            </span>
                          </div>
                          <h3 className="font-serif text-lg font-bold text-[#683B2B] mt-1">
                            {comm.title}
                          </h3>
                          <p className="text-xs text-[#683B2B]/70">
                            Nghệ sĩ phụ trách: <strong>{comm.artistName}</strong> · Ngân sách ủy thác: <strong className="text-[#B08401]">{comm.budget.toLocaleString('vi-VN')} ₫</strong>
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] uppercase tracking-wider text-[#683B2B]/60 block font-sans">
                            Trạng thái Escrow
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                            <Shield className="w-3.5 h-3.5" />
                            <span>Đã Phong Tỏa An Toàn</span>
                          </span>
                        </div>
                      </div>

                      {/* Visual Stepper */}
                      <div className="space-y-2">
                        <div className="grid grid-cols-5 gap-2">
                          {stepsList.map((step, idx) => {
                            const isPassed = idx < currentIdx;
                            const isCurrent = idx === currentIdx;

                            return (
                              <div key={step.key} className="text-center space-y-1.5">
                                <div className={`h-2 rounded-full transition-all ${
                                  isPassed
                                    ? 'bg-[#B08401]'
                                    : isCurrent
                                    ? 'bg-[#D49E8D] ring-2 ring-[#B08401]/30'
                                    : 'bg-[#DED1BD]/40'
                                }`} />
                                <div className="hidden sm:block">
                                  <p className={`text-[11px] font-bold ${
                                    isCurrent ? 'text-[#B08401]' : isPassed ? 'text-[#683B2B]' : 'text-[#683B2B]/40'
                                  }`}>
                                    {step.label}
                                  </p>
                                  <p className="text-[10px] text-[#683B2B]/60 leading-tight">
                                    {step.desc}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="sm:hidden text-center text-xs font-bold text-[#B08401]">
                          Bước hiện tại: {stepsList[currentIdx]?.label}
                        </div>
                      </div>

                      {/* Interactive Step Actions */}
                      <div className="p-4 bg-[#FAF6F2] rounded-xl border border-[#DED1BD] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                        <div className="space-y-0.5 text-center sm:text-left">
                          <p className="font-bold text-[#683B2B]">
                            {comm.currentStep === 'deposit_escrow' && 'Khoản tiền đã được Escrow giữ. Họa sĩ đang chuẩn bị bản phác thảo.'}
                            {comm.currentStep === 'sketch_concept' && 'Họa sĩ đã đăng tải phác thảo bố cục. Vui lòng xem và bấm Duyệt để lên màu.'}
                            {comm.currentStep === 'color_refinement' && 'Tác phẩm đang được hoàn thiện màu sắc và ánh sáng chi tiết.'}
                            {comm.currentStep === 'final_approval' && 'Bản vẽ cuối cùng đã hoàn tất! Vui lòng nghiệm thu để nhận file gốc.'}
                            {comm.currentStep === 'completed' && 'Đơn hàng đã hoàn thành trọn vẹn! File gốc và chứng nhận bản quyền đã bàn giao.'}
                          </p>
                          <p className="text-[11px] text-[#683B2B]/70">
                            Brief yêu cầu: "{comm.brief}"
                          </p>
                        </div>

                        {/* Interactive Step Advancer */}
                        {comm.currentStep !== 'completed' && (
                          <div className="flex gap-2 shrink-0">
                            {comm.currentStep === 'color_refinement' && (
                              <button
                                onClick={() => onUpdateCommissionStep(comm.id, 'final_approval')}
                                className="px-4 py-2 text-xs font-semibold text-white bg-[#B08401] hover:bg-[#977000] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Duyệt Bản Màu & Sang Nghiệm Thu</span>
                              </button>
                            )}
                            {comm.currentStep === 'final_approval' && (
                              <button
                                onClick={() => onUpdateCommissionStep(comm.id, 'completed')}
                                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                              >
                                <Shield className="w-3.5 h-3.5" />
                                <span>Nghiệm Thu & Giải Ngân Cho Artist</span>
                              </button>
                            )}
                            {comm.currentStep === 'deposit_escrow' && (
                              <button
                                onClick={() => onUpdateCommissionStep(comm.id, 'sketch_concept')}
                                className="px-3.5 py-1.5 text-xs font-semibold text-[#683B2B] bg-white border border-[#DED1BD] rounded-lg hover:border-[#B08401] cursor-pointer"
                              >
                                <span>Cập nhật bản phác thảo</span>
                              </button>
                            )}
                            {comm.currentStep === 'sketch_concept' && (
                              <button
                                onClick={() => onUpdateCommissionStep(comm.id, 'color_refinement')}
                                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#683B2B] hover:bg-[#B08401] rounded-lg cursor-pointer"
                              >
                                <span>Duyệt Phác Thảo & Lên Màu</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}

      {/* VIEW 2: CREATOR DASHBOARD (Quản Lý Bán Tranh, Doanh Thu, Rút Tiền) */}
      {activeTab === 'creator' && (
        <div className="space-y-8">
          
          {/* Revenue Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-[#DED1BD] rounded-2xl shadow-xs space-y-1">
              <span className="text-xs text-[#683B2B]/60 font-sans">Tổng Doanh Thu Lũy Kế</span>
              <p className="font-serif text-2xl font-bold text-[#683B2B] tabular-nums">
                32.400.000 ₫
              </p>
              <span className="text-[11px] text-emerald-700 font-medium">↑ 18% so với tháng trước</span>
            </div>

            <div className="p-5 bg-white border border-[#DED1BD] rounded-2xl shadow-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#683B2B]/60 font-sans">Số Dư Khả Dụng</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <p className="font-serif text-2xl font-bold text-[#B08401] tabular-nums">
                {currentUser.balance.toLocaleString('vi-VN')} ₫
              </p>
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="text-[11px] text-[#B08401] hover:underline font-semibold cursor-pointer"
              >
                Rút doanh thu về ngân hàng →
              </button>
            </div>

            <div className="p-5 bg-white border border-[#DED1BD] rounded-2xl shadow-xs space-y-1">
              <span className="text-xs text-[#683B2B]/60 font-sans">Tác Phẩm Đang Niêm Yết</span>
              <p className="font-serif text-2xl font-bold text-[#683B2B] tabular-nums">
                {userArtworks.length} tranh
              </p>
              <span className="text-[11px] text-[#683B2B]/70 font-sans">Được bảo vệ watermark 100%</span>
            </div>

            <div className="p-5 bg-white border border-[#DED1BD] rounded-2xl shadow-xs space-y-1">
              <span className="text-xs text-[#683B2B]/60 font-sans">Đơn Commission Đang Chạy</span>
              <p className="font-serif text-2xl font-bold text-[#683B2B] tabular-nums">
                {commissions.length} đơn
              </p>
              <span className="text-[11px] text-[#B08401] font-medium font-sans">1 đơn cần duyệt màu</span>
            </div>
          </div>

          {/* Quick Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-[#DED1BD] rounded-2xl">
            <div className="space-y-0.5">
              <h3 className="font-serif text-base font-bold text-[#683B2B]">
                Creator Studio Tác Phẩm
              </h3>
              <p className="text-xs text-[#683B2B]/70">
                Đăng thêm tác phẩm mới hoặc thiết lập độc quyền thương mại
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="px-4 py-2 text-xs font-semibold text-[#683B2B] bg-[#FAF6F2] hover:bg-white border border-[#DED1BD] rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Wallet className="w-3.5 h-3.5 text-[#B08401]" />
                <span>Rút Doanh Thu</span>
              </button>
              <button
                onClick={onOpenStudio}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#683B2B] hover:bg-[#B08401] rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <span>+ Đăng Bán Tranh Mới</span>
              </button>
            </div>
          </div>

          {/* Published Artworks Management List */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#683B2B]">
              Danh Mục Tác Phẩm Của Bạn
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userArtworks.map((art) => (
                <div
                  key={art.id}
                  className="p-4 bg-white border border-[#DED1BD] rounded-2xl shadow-xs space-y-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-18 h-18 object-cover rounded-xl border border-[#DED1BD] shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] text-[#B08401] font-semibold uppercase">
                        {art.category} · {art.style}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-[#683B2B] line-clamp-1">
                        {art.title}
                      </h4>
                      <p className="text-xs font-serif font-bold text-[#683B2B]">
                        {art.personalPrice.toLocaleString('vi-VN')} ₫
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#DED1BD]/50 flex items-center justify-between text-xs text-[#683B2B]/70">
                    <span>❤️ {art.likes} lượt thích</span>
                    <span className="text-emerald-700 font-medium">Đang niêm yết</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* WITHDRAWAL MODAL */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-[#FAF6F2] border border-[#DED1BD] rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DED1BD]">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#B08401]" />
                <h3 className="font-serif text-lg font-bold text-[#683B2B]">Rút Doanh Thu Nghệ Sĩ</h3>
              </div>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-[#683B2B]/60 hover:text-[#683B2B] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleExecuteWithdrawal} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#683B2B] font-semibold mb-1">Số tiền rút (VND)</label>
                <input
                  type="number"
                  value={withdrawAmount}
                  max={currentUser.balance}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-[#DED1BD] rounded-lg font-bold text-[#683B2B]"
                />
                <span className="text-[10px] text-[#683B2B]/60 mt-0.5 block">
                  Số dư khả dụng: {currentUser.balance.toLocaleString('vi-VN')} ₫
                </span>
              </div>

              <div>
                <label className="block text-[#683B2B] font-semibold mb-1">Ngân hàng thụ hưởng</label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#DED1BD] rounded-lg text-[#683B2B]"
                >
                  <option value="Vietcombank">Vietcombank (Ngoại Thương Việt Nam)</option>
                  <option value="Techcombank">Techcombank (Kỹ Thương Việt Nam)</option>
                  <option value="MBBank">MBBank (Quân Đội)</option>
                  <option value="ACB">ACB (Á Châu)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#683B2B] font-semibold mb-1">Số tài khoản ngân hàng</label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#DED1BD] rounded-lg text-[#683B2B] font-mono"
                />
              </div>

              <div>
                <label className="block text-[#683B2B] font-semibold mb-1">Tên chủ tài khoản (In hoa không dấu)</label>
                <input
                  type="text"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#DED1BD] rounded-lg text-[#683B2B] font-bold"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={withdrawSuccess}
                  className="w-full py-2.5 text-xs font-semibold text-white bg-[#B08401] hover:bg-[#977000] rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  {withdrawSuccess ? 'Đang chuyển khoản Napas 24/7...' : 'Xác Nhận Rút Tiền Về Ngân Hàng'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
