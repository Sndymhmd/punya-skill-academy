'use client';

import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle, Award, Calendar, User, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function VerifyCertificate() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    found: boolean;
    data?: any;
    searched: boolean;
  }>({ found: false, searched: false });

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    const supabase = createClient();

    const { data, error } = await supabase
      .from('certificates')
      .select('*, profiles(full_name, institution_name), programs(title, category)')
      .ilike('certificate_code', code.trim())
      .maybeSingle();

    setLoading(false);
    if (data) {
      setResult({ found: true, data, searched: true });
    } else {
      setResult({ found: false, searched: true });
    }
  }

  return (
    <section id="verifikasi" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
      <div className="max-w-3xl mx-auto text-center">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Sistem Verifikasi Digital</span>
        </div>

        <h2 className="text-3xl font-extrabold text-[#003049]">
          Verifikasi Keaslian Sertifikat
        </h2>
        <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto">
          Cek keabsahan e-sertifikat yang diterbitkan oleh Punya Skill Academy (Webinar, Magang, maupun Uji Kompetensi BNSP).
        </p>

        {/* Input Form */}
        <form onSubmit={handleVerify} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Masukkan Nomor Sertifikat (cth: PSA/2026/...)"
            required
            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#003049]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-[#003049] hover:bg-[#002235] text-white font-semibold text-sm transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Memverifikasi...</span>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Cek Validitas</span>
              </>
            )}
          </button>
        </form>

        {/* Verification Result */}
        {result.searched && (
          <div className="mt-8">
            {result.found ? (
              <div className="bg-white rounded-2xl border-2 border-emerald-500/40 p-6 text-left shadow-lg max-w-lg mx-auto">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>SERTIFIKAT RESMI TERDAFTAR</span>
                </div>

                <div className="space-y-3 text-sm text-slate-700">
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">KODE SERTIFIKAT</span>
                    <span className="font-mono font-bold text-[#003049]">{result.data.certificate_code}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">NAMA PESERTA</span>
                    <span className="font-bold text-slate-900">{result.data.profiles?.full_name || 'Peserta Terdaftar'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">PROGRAM / KEGIATAN</span>
                    <span className="font-medium text-slate-800">{result.data.programs?.title || 'Kegiatan Punya Skill Academy'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">TANGGAL TERBIT</span>
                    <span className="text-slate-600">{result.data.issue_date}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center max-w-lg mx-auto text-rose-800 text-sm">
                <XCircle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
                <p className="font-bold">Sertifikat Tidak Ditemukan</p>
                <p className="text-xs mt-1 text-rose-600">
                  Nomor kode yang Anda masukkan tidak terdaftar di pangkalan data Supabase Punya Skill Academy. Pastikan penulisan huruf besar/kecil sesuai.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
