import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, ShieldCheck, Mail, Lock, User, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { UserRole, User as UserType } from '../types';
import { artistAvatarLinhImg } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserType) => void;
  initialRole?: UserRole;
  intentActionText?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialRole = 'buyer',
  intentActionText,
}) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<UserRole>(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // OTP Simulation State
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResendOtp, setCanResendOtp] = useState(false);

  // Brute-force protection simulation
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  useEffect(() => {
    setRole(initialRole);
  }, [initialRole]);

  // Handle countdown for lockout
  useEffect(() => {
    if (lockoutTimer > 0) {
      const timer = setInterval(() => {
        setLockoutTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [lockoutTimer]);

  // Handle countdown for OTP
  useEffect(() => {
    if (isVerifyingOtp && otpTimer > 0) {
      const timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setCanResendOtp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isVerifyingOtp, otpTimer]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (lockoutTimer > 0) {
      setErrorMessage(`Hệ thống đang tạm khóa để chống tấn công dò mật khẩu. Vui lòng thử lại sau ${lockoutTimer} giây.`);
      return;
    }

    if (!email || !password) {
      setErrorMessage('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    // Demo check: wrong password if user tests wrong password
    if (password === 'wrong') {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 3) {
        setLockoutTimer(30);
        setErrorMessage('Cảnh báo bảo mật: Bạn đã nhập sai 3 lần liên tiếp. Khóa tài khoản tạm thời 30 giây để chống Brute-force.');
      } else {
        setErrorMessage(`Mật khẩu không chính xác. Còn ${3 - newAttempts} lần thử trước khi khóa tạm thời.`);
      }
      return;
    }

    // Trigger OTP Step for high security demonstration
    setIsVerifyingOtp(true);
    setOtpDigits(['5', '2', '8', '', '', '']); // pre-fill hints for smooth demo
    setOtpTimer(60);
    setSuccessNotice(`Mã xác thực bảo mật 6 số đã được gửi tới email ${email || 'nguoimua@artfair.gallery'}.`);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Vui lòng điền đầy đủ email và mật khẩu.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('Bạn cần đồng ý với Quy chế sàn và Tiêu chuẩn Bản quyền ARTFAIR.');
      return;
    }

    // Proceed to OTP
    setIsVerifyingOtp(true);
    setOtpDigits(['9', '1', '4', '', '', '']);
    setOtpTimer(60);
    setSuccessNotice(`Mã OTP kích hoạt tài khoản ${role === 'creator' ? 'Nghệ Sĩ' : 'Nhà Sưu Tập'} đã gửi tới ${email}.`);
  };

  const handleOtpInput = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const fullOtp = otpDigits.join('');
    if (fullOtp.length < 6) {
      setErrorMessage('Vui lòng điền đủ 6 chữ số mã OTP.');
      return;
    }

    // Success login
    const newUser: UserType = {
      id: `usr-${Date.now()}`,
      name: role === 'creator' ? 'Linh Đan (Atelier Linh)' : 'Nguyễn Trần Hải',
      email: email || (role === 'creator' ? 'creator@artfair.gallery' : 'collector@artfair.gallery'),
      avatar: artistAvatarLinhImg,
      role: role,
      balance: role === 'creator' ? 18650000 : 25000000,
      isVerified: true,
    };

    onSuccess(newUser);
    onClose();
  };

  const handleQuickDemoLogin = (selectedRole: UserRole) => {
    const demoUser: UserType = {
      id: `usr-demo-${selectedRole}`,
      name: selectedRole === 'creator' ? 'Linh Đan (Atelier Linh)' : 'Trần Minh Đức (Collector)',
      email: selectedRole === 'creator' ? 'linhdan@atelier.art' : 'duc.collector@gmail.com',
      avatar: artistAvatarLinhImg,
      role: selectedRole,
      balance: selectedRole === 'creator' ? 24500000 : 35000000,
      isVerified: true,
    };
    onSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#FAF6F2] border border-[#DED1BD] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DED1BD] bg-[#FAF6F2]">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold tracking-wider text-[#683B2B]">ARTFAIR</span>
            <span className="text-[11px] font-sans text-[#B08401] uppercase tracking-widest font-semibold">
              Xác Thực & Bản Quyền
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#683B2B]/60 hover:text-[#683B2B] hover:bg-[#DED1BD]/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Intent notification banner if triggered by a user action */}
        {intentActionText && (
          <div className="bg-[#D49E8D]/15 px-6 py-2.5 border-b border-[#DED1BD] flex items-center gap-2 text-xs text-[#683B2B]">
            <Sparkles className="w-4 h-4 text-[#B08401] shrink-0" />
            <span>Vui lòng đăng nhập để tiếp tục <strong>{intentActionText}</strong>.</span>
          </div>
        )}

        <div className="p-6">
          {/* OTP Verification Flow */}
          {isVerifyingOtp ? (
            <div className="space-y-5">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#B08401]/10 flex items-center justify-center text-[#B08401] mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#683B2B]">Xác Thực OTP 6 Chữ Số</h3>
                <p className="text-xs text-[#683B2B]/70 mt-1">
                  Nhập mã bảo mật gửi đến email để kích hoạt phiên làm việc bảo mật ARTFAIR.
                </p>
              </div>

              {successNotice && (
                <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{successNotice}</span>
                </div>
              )}

              {/* 6 Digit Inputs */}
              <div className="flex justify-center gap-2 sm:gap-3 py-2">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpInput(index, e.target.value)}
                    className="w-11 h-12 text-center text-lg font-bold font-mono bg-white border border-[#DED1BD] rounded-lg text-[#683B2B] focus:border-[#B08401] focus:ring-1 focus:ring-[#B08401] focus:outline-none shadow-xs"
                  />
                ))}
              </div>

              {/* Timer and Resend */}
              <div className="flex items-center justify-between text-xs text-[#683B2B]/70 px-2">
                <span>
                  {otpTimer > 0 ? (
                    <>Mã hết hạn sau: <span className="font-mono font-semibold text-[#B08401]">{otpTimer}s</span></>
                  ) : (
                    <span className="text-red-700">Mã đã hết hạn</span>
                  )}
                </span>
                <button
                  type="button"
                  disabled={!canResendOtp}
                  onClick={() => {
                    setOtpTimer(60);
                    setCanResendOtp(false);
                    setSuccessNotice('Đã gửi lại mã OTP mới qua email.');
                  }}
                  className={`font-medium ${
                    canResendOtp ? 'text-[#B08401] hover:underline cursor-pointer' : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Gửi lại mã
                </button>
              </div>

              {errorMessage && (
                <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                  {errorMessage}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsVerifyingOtp(false)}
                  className="flex-1 py-2.5 text-xs font-semibold text-[#683B2B] border border-[#DED1BD] rounded-lg hover:bg-white transition-colors cursor-pointer"
                >
                  Quay lại
                </button>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="flex-1 py-2.5 text-xs font-semibold text-white bg-[#B08401] hover:bg-[#977000] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Hoàn Tất Xác Thực</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Standard Login / Register Tabs */
            <div>
              {/* Segmented Control Tabs */}
              <div className="flex p-1 bg-[#DED1BD]/40 rounded-xl mb-5">
                <button
                  type="button"
                  onClick={() => { setTab('login'); setErrorMessage(null); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    tab === 'login'
                      ? 'bg-white text-[#683B2B] shadow-xs'
                      : 'text-[#683B2B]/70 hover:text-[#683B2B]'
                  }`}
                >
                  Đăng Nhập
                </button>
                <button
                  type="button"
                  onClick={() => { setTab('register'); setErrorMessage(null); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    tab === 'register'
                      ? 'bg-white text-[#683B2B] shadow-xs'
                      : 'text-[#683B2B]/70 hover:text-[#683B2B]'
                  }`}
                >
                  Đăng Ký Tài Khoản
                </button>
              </div>

              {/* Lockout Warning */}
              {lockoutTimer > 0 && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Cơ chế chống Brute-force đang kích hoạt</p>
                    <p className="mt-0.5">Khóa tạm thời: Vui lòng đợi <strong className="font-mono">{lockoutTimer}s</strong> trước khi thử lại.</p>
                  </div>
                </div>
              )}

              {/* Login Tab */}
              {tab === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#683B2B] mb-1">
                      Email hoặc Tên tài khoản
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#683B2B]/40" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nguoimua@artfair.gallery"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-[#DED1BD] rounded-lg text-xs text-[#683B2B] placeholder:text-[#683B2B]/40 focus:outline-none focus:border-[#B08401]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-[#683B2B]">Mật khẩu</label>
                      <button
                        type="button"
                        onClick={() => alert('Mã đặt lại mật khẩu đã gửi qua email liên kết.')}
                        className="text-[11px] text-[#B08401] hover:underline cursor-pointer"
                      >
                        Quên mật khẩu?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#683B2B]/40" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-10 py-2 bg-white border border-[#DED1BD] rounded-lg text-xs text-[#683B2B] placeholder:text-[#683B2B]/40 focus:outline-none focus:border-[#B08401]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#683B2B]/50 hover:text-[#683B2B] cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {errorMessage && (
                    <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={lockoutTimer > 0}
                    className="w-full py-2.5 text-xs font-semibold text-white bg-[#683B2B] hover:bg-[#B08401] rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
                  >
                    Đăng Nhập Với Email & OTP
                  </button>
                </form>
              ) : (
                /* Register Tab with Mandatory Role Selection */
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  {/* MANDATORY ROLE SELECTION */}
                  <div>
                    <label className="block text-xs font-semibold text-[#683B2B] mb-1.5">
                      Bạn tham gia ARTFAIR với tư cách nào? <span className="text-[#B08401]">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        onClick={() => setRole('buyer')}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          role === 'buyer'
                            ? 'bg-white border-[#B08401] ring-1 ring-[#B08401] shadow-xs'
                            : 'bg-white/60 border-[#DED1BD] hover:border-[#B08401]/60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <User className="w-4 h-4 text-[#B08401]" />
                          <input
                            type="radio"
                            name="role"
                            checked={role === 'buyer'}
                            onChange={() => setRole('buyer')}
                            className="text-[#B08401] focus:ring-[#B08401]"
                          />
                        </div>
                        <p className="text-xs font-bold text-[#683B2B]">Người Mua (Buyer)</p>
                        <p className="text-[10px] text-[#683B2B]/60 mt-0.5 leading-tight">
                          Sưu tầm, mua bản quyền & đặt vẽ commission
                        </p>
                      </div>

                      <div
                        onClick={() => setRole('creator')}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          role === 'creator'
                            ? 'bg-white border-[#B08401] ring-1 ring-[#B08401] shadow-xs'
                            : 'bg-white/60 border-[#DED1BD] hover:border-[#B08401]/60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Sparkles className="w-4 h-4 text-[#B08401]" />
                          <input
                            type="radio"
                            name="role"
                            checked={role === 'creator'}
                            onChange={() => setRole('creator')}
                            className="text-[#B08401] focus:ring-[#B08401]"
                          />
                        </div>
                        <p className="text-xs font-bold text-[#683B2B]">Nghệ Sĩ (Creator)</p>
                        <p className="text-[10px] text-[#683B2B]/60 mt-0.5 leading-tight">
                          Đăng bán tác phẩm & nhận đơn đặt hàng cá nhân
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#683B2B] mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ban@example.com"
                      className="w-full px-3 py-2 bg-white border border-[#DED1BD] rounded-lg text-xs text-[#683B2B] focus:outline-none focus:border-[#B08401]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#683B2B] mb-1">Mật khẩu</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 bg-white border border-[#DED1BD] rounded-lg text-xs text-[#683B2B] focus:outline-none focus:border-[#B08401]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#683B2B] mb-1">Xác nhận</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 bg-white border border-[#DED1BD] rounded-lg text-xs text-[#683B2B] focus:outline-none focus:border-[#B08401]"
                      />
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <label className="flex items-start gap-2 text-xs text-[#683B2B]/80 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 rounded text-[#B08401] focus:ring-[#B08401]"
                    />
                    <span>
                      Tôi đồng ý với <strong>Điều khoản dịch vụ</strong>, chính sách bảo hộ bản quyền và cơ chế ký quỹ Escrow của ARTFAIR.
                    </span>
                  </label>

                  {errorMessage && (
                    <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-semibold text-white bg-[#B08401] hover:bg-[#977000] rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Đăng Ký & Nhận Mã OTP
                  </button>
                </form>
              )}

              {/* Social Login Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#DED1BD]"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-[#FAF6F2] text-[#683B2B]/50 font-sans">
                    Hoặc đăng nhập nhanh qua
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('buyer')}
                  className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-[#DED1BD] rounded-lg hover:bg-slate-50 text-xs font-medium text-[#683B2B] transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('creator')}
                  className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-[#DED1BD] rounded-lg hover:bg-slate-50 text-xs font-medium text-[#683B2B] transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current text-slate-900" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.64 1.35-.56.65-1.06 1.71-.93 2.73 1.01.08 2.02-.48 2.64-1.23z"/>
                  </svg>
                  <span>Apple ID</span>
                </button>
              </div>

              {/* Demo Mode Instant Logins */}
              <div className="mt-4 pt-3 border-t border-[#DED1BD]/50 flex items-center justify-between text-[11px] text-[#683B2B]/70">
                <span>Chế độ trải nghiệm nhanh:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('buyer')}
                    className="text-[#B08401] hover:underline font-semibold cursor-pointer"
                  >
                    Vào vai Người Mua
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('creator')}
                    className="text-[#683B2B] hover:underline font-semibold cursor-pointer"
                  >
                    Vào vai Họa Sĩ
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
