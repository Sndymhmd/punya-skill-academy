'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, ArrowLeft, CheckCircle2, Clock, XCircle, FileText, 
  Printer, Building, Calendar, User, Phone, Mail, Sparkles 
} from 'lucide-react';
import { checkApplicationStatus } from '@/app/actions/internship';
import { siteConfig } from '@/lib/config';

export default function CekStatusPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    application?: any;
    message?: string;
    notFound?: boolean;
    searched: boolean;
  }>({ success: false, searched: false });

  const [showLoaModal, setShowLoaModal] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const res = await checkApplicationStatus(query);
    setResult({
      success: res.success,
      application: res.application,
      message: res.message,
      notFound: res.notFound,
      searched: true
    });
    setLoading(false);
  }

  const app = result.application;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Bar */}
      <header className="bg-[#003049] text-white py-4 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-sky-200 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <div className="text-right">
            <span className="text-sm font-bold block">PUNYA SKILL ACADEMY</span>
            <span className="text-[10px] text-sky-300 tracking-wider uppercase block">Career & Internship Portal</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-12 space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-[#003049] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-sky-700" />
            <span>Pelacakan Status Seleksi</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#003049] tracking-tight">
            Cek Status Pendaftaran Magang / PKL
          </h1>
          <p className="text-slate-600 text-sm max-w-lg mx-auto">
            Masukkan Nomor WhatsApp atau Email yang Anda gunakan saat mengisi formulir pendaftaran magang.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nomor WhatsApp (cth: 0812...) atau Email"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#003049]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-[#003049] hover:bg-[#002235] text-white font-bold text-sm transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? 'Mencari...' : 'Periksa Status'}
            </button>
          </form>
        </div>

        {/* Search Results */}
        {result.searched && (
          <div>
            {result.success && app ? (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg transition-all">
                
                {/* Status Banner */}
                <div className={`p-6 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  app.status === 'approved' 
                    ? 'bg-emerald-50 border-emerald-100'
                    : app.status === 'rejected'
                    ? 'bg-rose-50 border-rose-100'
                    : 'bg-amber-50 border-amber-100'
                }`}>
                  <div className="flex items-center gap-3">
                    {app.status === 'approved' && (
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                    )}
                    {app.status === 'pending' && (
                      <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <Clock className="w-7 h-7" />
                      </div>
                    )}
                    {app.status === 'rejected' && (
                      <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                        <XCircle className="w-7 h-7" />
                      </div>
                    )}

                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status Lamaran</p>
                      <h3 className={`text-xl font-extrabold ${
                        app.status === 'approved' 
                          ? 'text-emerald-800'
                          : app.status === 'rejected'
                          ? 'text-rose-800'
                          : 'text-amber-800'
                      }`}>
                        {app.status === 'approved' && 'SELAMAT, PENDAFTARAN DITERIMA! 🎉'}
                        {app.status === 'pending' && 'SEDANG DALAM TAHAP REVIEW (PENDING) ⏳'}
                        {app.status === 'rejected' && 'BELUM MEMENUHI KUALIFIKASI ❌'}
                      </h3>
                    </div>
                  </div>

                  {app.status === 'approved' && (
                    <button
                      onClick={() => setShowLoaModal(true)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Unduh Surat Penerimaan (LoA)</span>
                    </button>
                  )}
                </div>

                {/* Details Section */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                    <div>
                      <span className="text-xs text-slate-400 block font-semibold">NAMA LENGKAP</span>
                      <span className="font-bold text-slate-900 text-base">{app.full_name}</span>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block font-semibold">NOMOR REGISTRASI (LOA)</span>
                      <span className="font-mono font-bold text-sky-800">{app.loa_number || '-'}</span>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block font-semibold">ASAL SEKOLAH / KAMPUS</span>
                      <span className="font-semibold text-slate-800">{app.institution_name}</span>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block font-semibold">JURUSAN</span>
                      <span className="font-semibold text-slate-800">{app.major}</span>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block font-semibold">RENCANA PERIODE MAGANG</span>
                      <span className="text-slate-700">{app.start_period} s/d {app.end_period}</span>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block font-semibold">TANGGAL PENDAFTARAN</span>
                      <span className="text-slate-700">{new Date(app.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}</span>
                    </div>
                  </div>

                  {/* Informative Guidance */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                    {app.status === 'approved' && (
                      <p>
                        Surat Penerimaan Magang resmi telah diterbitkan. Silakan unduh dokumen LoA untuk diserahkan ke koordinator magang / BKK sekolah SMK atau bagian akademik kampus Anda. Tim Punya Skill Academy akan mengundang Anda ke grup WhatsApp koordinasi onboarding.
                      </p>
                    )}
                    {app.status === 'pending' && (
                      <p>
                        Berkas portofolio dan CV Anda sedang diproses oleh tim pembimbing Punya Skill Academy. Proses review berkas memerlukan waktu 1-3 hari kerja. Pastikan nomor WhatsApp Anda aktif untuk menerima konfirmasi wawancara/onboarding.
                      </p>
                    )}
                    {app.status === 'rejected' && (
                      <p>
                        Terima kasih atas antusiasme Anda mendaftar di Punya Skill Academy. Kuota untuk periode yang Anda pilih saat ini telah penuh. Anda dipersilakan untuk mengajukan permohonan kembali pada batch berikutnya.
                      </p>
                    )}
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#003049] text-lg">Data Tidak Ditemukan</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  {result.message || 'Tidak ada riwayat pendaftaran dengan nomor WhatsApp atau email tersebut.'}
                </p>
                <div className="pt-2">
                  <Link
                    href="/#magang"
                    className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:underline"
                  >
                    <span>Ingin mendaftar magang sekarang? Buka Formulir</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Modal LoA PDF View & Print */}
      {showLoaModal && app && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-bold text-[#003049] text-base">Surat Penerimaan Magang Resmi (LoA)</h3>
                <p className="text-xs text-slate-500">PUNYA SKILL ACADEMY</p>
              </div>
              <button
                onClick={() => setShowLoaModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 border p-5 rounded-xl bg-slate-50 font-serif leading-relaxed">
              <div className="text-center border-b pb-3">
                <h4 className="font-bold text-base text-[#003049] uppercase tracking-wide font-sans">
                  PUNYA SKILL ACADEMY
                </h4>
                <p className="text-[11px] text-slate-500 font-sans">
                  Email: {siteConfig.email} | WA: {siteConfig.whatsappDisplay}
                </p>
                <div className="text-[11px] font-mono font-semibold text-slate-600 mt-1">
                  Nomor: {app.loa_number}
                </div>
              </div>

              <p className="font-sans">
                Dengan hormat,<br/>
                Berdasarkan hasil seleksi berkas dan kualifikasi permohonan Praktik Kerja Lapangan (PKL) / Magang Industri, manajemen <strong>Punya Skill Academy</strong> secara resmi menerangkan bahwa:
              </p>

              <div className="space-y-1.5 font-sans bg-white p-3.5 rounded-lg border border-slate-200 text-xs">
                <div>Nama Siswa/Mahasiswa: <strong>{app.full_name}</strong></div>
                <div>Asal Sekolah/Kampus: <strong>{app.institution_name}</strong></div>
                <div>Program Studi / Jurusan: <strong>{app.major}</strong></div>
                <div>Periode Magang: <strong>{app.start_period} s/d {app.end_period}</strong></div>
                <div>Status: <strong className="text-emerald-700 uppercase">DITERIMA (APPROVED)</strong></div>
              </div>

              <p className="font-sans text-xs text-slate-600">
                Peserta yang bersangkutan berhak mengikuti seluruh rangkaian onboarding, pembimbingan mentor praktisi, dan pelaksanaan Project-Based Learning sesuai jadwal yang ditentukan.
              </p>

              <div className="pt-4 flex justify-between items-end font-sans text-xs">
                <div>
                  <p className="text-slate-400">Verifikasi Dokumen:</p>
                  <p className="font-mono text-[10px] text-slate-500">Status: Validated Online</p>
                </div>
                <div className="text-right">
                  <p>Bandung / Daring,</p>
                  <p className="font-bold text-[#003049] mt-6">Manajemen Punya Skill Academy</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end border-t pt-4">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#003049] text-white rounded-lg text-xs font-bold hover:bg-[#002235] flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak / Simpan PDF</span>
              </button>
              <button
                onClick={() => setShowLoaModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 text-center text-xs text-slate-500">
        © 2026 Punya Skill Academy · Portal Pelatihan & Karir Terpadu
      </footer>
    </div>
  );
}
