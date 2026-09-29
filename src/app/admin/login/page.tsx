'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginAdmin, getAdminSession } from '@/lib/admin-auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@luxeestate.vn');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const session = getAdminSession();
    if (session) {
      router.replace('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = loginAdmin(email, password);
      if (res.success) {
        router.push('/admin/dashboard');
      } else {
        setError(res.error || 'Đăng nhập không thành công.');
        setLoading(false);
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('admin@luxeestate.vn');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#0E1318] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Subtle luxury ambient glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/10 relative z-10">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-[#111111] text-[#C9A96E] font-display text-2xl font-bold items-center justify-center mb-4 shadow-lg">
            L
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
            Luxe<span className="text-[#C9A96E]">Estate</span>
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#6B6B6B] font-semibold mt-1">
            Admin Management Portal
          </p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="mb-6 p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900 flex items-center justify-between">
          <div>
            <span className="font-semibold block">Tài khoản demo sẵn có:</span>
            <span className="font-mono text-[11px] text-amber-800">admin@luxeestate.vn / admin123</span>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="px-2.5 py-1 bg-amber-200/70 hover:bg-amber-300 text-amber-900 rounded-lg text-[11px] font-semibold transition-colors"
          >
            Điền nhanh
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-2xl flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-2 uppercase tracking-wider">
              Email Quản Trị
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-sm text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
              placeholder="admin@luxeestate.vn"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-[#111111] uppercase tracking-wider">
                Mật Khẩu
              </label>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-sm text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-[#111111] text-white hover:bg-black rounded-xl text-sm font-semibold transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Đang xác thực...</span>
              </>
            ) : (
              <span>Đăng Nhập Quản Trị</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-[#E8E8E5]">
          <Link
            href="/"
            className="text-xs text-[#6B6B6B] hover:text-[#111111] transition-colors flex items-center justify-center gap-1.5"
          >
            <span>← Quay lại Website Khách Hàng</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
