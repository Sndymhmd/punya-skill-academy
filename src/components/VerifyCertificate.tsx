'use client';

import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle, Award, Calendar, User, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function VerifyCertificate() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    const clean = searchTerm.trim();
    if (!clean) return;

    setLoading(true);
    setHasSearched(true);
    const supabase = createClient();

    // Cari berdasarkan Kode Sertifikat ATAU Nama Penerima
    const { data, error } = await supabase
      .from('certificates')
      .select('*, profiles(full_name, institution_name), programs(title, category)')
      .or(`certificate_code.ilike.%${clean}%,recipient_name.ilike.%${clean}%`)
      .order('issue_date', { ascending: false });

    setLoading(false);
    if (data && data.length > 0) {
      setResults(data);
    } else {
      setResults([]);
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
          Verifikasi & Pencarian Sertifikat
        </h2>
        <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto">
          Cek keabsahan e-sertifikat Punya Skill Academy. Anda bisa mencari menggunakan <strong>Kode Sertifikat</strong> ataupun <strong>Nama Lengkap Peserta</strong>.
        </p>

        {/* Input Form */}
        <form onSubmit={handleVerify} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ketik Nama Peserta atau Kode (cth: Alex / PSA/2026/...)"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#003049] bg-white shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-[#003049] hover:bg-[#002235] text-white font-semibold text-sm transition flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
          >
            {loading ? (
              <span>Mencari...</span>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Cari Sertifikat</span>
              </>
            )}
          </button>
        </form>

        {/* Verification Results */}
        {hasSearched && (
          <div className="mt-8 space-y-4">
            {results.length > 0 ? (
              <div className="space-y-4 max-w-xl mx-auto text-left">
                <p className="text-xs font-semibold text-slate-500 text-center">
                  Ditemukan {results.length} sertifikat yang sesuai:
                </p>

                {results.map((cert) => (
                  <div 
                    key={cert.id}
                    className="bg-white rounded-2xl border-2 border-emerald-500/40 p-6 shadow-lg transition hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                      <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>SERTIFIKAT RESMI TERVERIFIKASI</span>
                      </div>
                      <span className="text-[11px] font-mono bg-sky-50 text-sky-800 px-2.5 py-1 rounded-md font-semibold border border-sky-100">
                        ORIGINAL
                      </span>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div>
                        <span className="text-xs text-slate-400 block font-semibold">NAMA LENGKAP PENERIMA</span>
                        <span className="font-extrabold text-slate-900 text-base">
                          {cert.recipient_name || cert.profiles?.full_name || 'Peserta Terdaftar'}
                        </span>
                      </div>

                      <div>
                        <span className="text-xs text-slate-400 block font-semibold">PROGRAM / KEGIATAN</span>
                        <span className="font-semibold text-[#003049]">
                          {cert.program_name || cert.programs?.title || 'Kegiatan Punya Skill Academy'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                        <div>
                          <span className="text-xs text-slate-400 block font-semibold">NOMOR SERTIFIKAT</span>
                          <span className="font-mono font-bold text-emerald-800 text-xs sm:text-sm">
                            {cert.certificate_code}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-slate-400 block font-semibold">TANGGAL TERBIT</span>
                          <span className="text-slate-600 text-xs sm:text-sm">
                            {cert.issue_date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center max-w-lg mx-auto text-rose-800 text-sm shadow-sm">
                <XCircle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
                <p className="font-bold">Sertifikat Tidak Ditemukan</p>
                <p className="text-xs mt-1 text-rose-600">
                  Tidak ditemukan sertifikat dengan nama atau kode <strong>&quot;{searchTerm}&quot;</strong>. Pastikan ejaan nama atau kode sertifikat sudah sesuai.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}