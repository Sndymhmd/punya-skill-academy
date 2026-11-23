'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldAlert, ArrowLeft, KeyRound } from 'lucide-react';
import Link from 'next/link';
import { adminLogin } from '@/app/actions/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await adminLogin(formData);

    if (res.success) {
      router.push('/admin');
      router.refresh();
    } else {
      setError(res.message || 'Akses ditolak.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 sm:px-6">
      
      {/* Back to Public Web */}
      <div className="mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Halaman Utama Publik
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-slate-800">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#003049] text-white mx-auto flex items-center justify-center mb-3 shadow-md">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-[#003049] tracking-tight">
            Portal Khusus Admin
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Area terbatas. Hanya untuk pengelola resmi Punya Skill Academy.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Kunci Akses / PIN Admin
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                name="secretKey"
                required
                placeholder="Masukkan PIN / Sandi Admin..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#003049]"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              PIN default: <code>admin123</code> (bisa diganti kapan saja)
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#003049] hover:bg-[#002235] text-white font-bold text-sm shadow-md transition disabled:opacity-50"
          >
            {loading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
          Hak Cipta © 2026 Punya Skill Academy
        </div>

      </div>
    </div>
  );
}
