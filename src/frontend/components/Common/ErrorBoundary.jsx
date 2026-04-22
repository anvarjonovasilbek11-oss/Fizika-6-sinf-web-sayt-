import React from 'react';
import { RiErrorWarningLine, RiRefreshLine } from 'react-icons/ri';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-space-dark flex items-center justify-center p-6 text-center">
          <div className="glass-card max-w-md p-10 border-red-500/20 bg-red-500/5">
            <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <RiErrorWarningLine size={48} />
            </div>
            <h1 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">
              Tizimda Xatolik Yuz Berdi
            </h1>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Kutilmagan xatolik tufayli sahifa yuklanmadi. Iltimos, ma'lumotlarni yangilab qaytadan urinib ko'ring.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center gap-3 py-4 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all"
            >
              <RiRefreshLine size={24} /> Sahifani Yangilash
            </button>
            <p className="mt-4 text-[10px] text-slate-600 font-mono break-all">
              {this.state.error?.toString()}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
