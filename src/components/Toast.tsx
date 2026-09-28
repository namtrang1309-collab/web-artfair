import React from 'react';
import { ShieldAlert, CheckCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'warning';
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#FAF6F2] border border-[#DED1BD] rounded-xl p-3.5 shadow-xl text-xs flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
          {toast.type === 'warning' && <ShieldAlert className="w-5 h-5 text-[#B08401] shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />}

          <div className="flex-1 space-y-0.5">
            <h4 className="font-bold text-[#683B2B]">{toast.title}</h4>
            <p className="text-[#683B2B]/80 leading-relaxed text-[11px]">{toast.message}</p>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[#683B2B]/50 hover:text-[#683B2B] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
