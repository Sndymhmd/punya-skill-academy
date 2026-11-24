'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Users, Award, CheckCircle, XCircle, Clock, ExternalLink, 
  ArrowLeft, RefreshCw, PlusCircle, Search, FileText, Check, ShieldAlert, LogOut, Lock 
} from 'lucide-react';
import { getInternshipApplications, updateApplicationStatus, createNewCertificate } from '@/app/actions/admin';
import { adminLogout, verifyAdminSession } from '@/app/actions/auth';

export default function AdminClient() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<'applications' | 'certificates'>('applications');
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLoa, setSelectedLoa] = useState<any | null>(null);

  // Form Sertifikat Baru
  const [certLoading, setCertLoading] = useState(false);
  const [certResult, setCertResult] = useState<{ success: boolean; message: string; code?: string } | null>(null);

  async function checkAuthAndLoad() {
    const isAuth = await verifyAdminSession();
    if (!isAuth) {
      router.replace('/admin/login');
      return;
    }
    setIsCheckingAuth(false);
    loadData();
  }

  async function loadData() {
    setLoading(true);
    const data = await getInternshipApplications();
    setApplications(data);
    setLoading(false);
  }

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  async function handleStatusChange(id: string, status: 'approved' | 'rejected') {
    const res = await updateApplicationStatus(id, status);
    if (res.success) {
      loadData();
    } else {
      alert('Gagal update status: ' + res.message);
    }
  }

  async function handleCreateCert(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCertLoading(true);
    setCertResult(null);

    const formData = new FormData(e.currentTarget);
    const res = await createNewCertificate(formData);
    setCertResult({ success: res.success, message: res.message, code: res.certificateCode });
    setCertLoading(false);

    if (res.success) {
      (e.target as HTMLFormElement).reset();
    }
  }

  // Jika sedang memverifikasi izin admin
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 rounded-xl bg-[#003049] flex items-center justify-center animate-pulse border border-sky-500/30">
          <Lock className="w-6 h-6 text-sky-300" />
        </div>
        <p className="text-xs text-slate-400 font-medium">Memeriksa hak akses administrator...</p>
      </div>
    );
  }

  const filteredApps = applications.filter(app => 
    (app.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.institution_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.loa_number || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPending = applications.filter(a => a.status === 'pending').length;
  const totalApproved = applications.filter(a => a.status === 'approved').length;
  const totalRejected = applications.filter(a => a.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="bg-[#003049] text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-1.5 text-xs font-semibold text-sky-200 hover:text-white bg-white/10 px-3 py-1.5 rounded-lg transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Web Publik
            </Link>
            <div className="h-5 w-px bg-white/20 hidden sm:block"></div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight">
              Portal Admin Punya Skill Academy
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition text-xs flex items-center gap-1.5"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>
            <form action={adminLogout}>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-700 text-white transition text-xs font-semibold flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">Total Pendaftar</p>
              <h3 className="text-2xl font-extrabold text-[#003049] mt-1">{applications.length}</h3>
            </div>
            <div className="p-3 bg-sky-50 text-sky-700 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">Menunggu Review</p>
              <h3 className="text-2xl font-extrabold text-amber-600 mt-1">{totalPending}</h3>
            </div>
            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">Diterima (Approved)</p>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">{totalApproved}</h3>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">Ditolak</p>
              <h3 className="text-2xl font-extrabold text-rose-600 mt-1">{totalRejected}</h3>
            </div>
            <div className="p-3 bg-rose-50 text-rose-700 rounded-xl">
              <XCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-300 gap-4">
          <button
            onClick={() => setActiveTab('applications')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'applications'
                ? 'border-[#003049] text-[#003049]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            Kelola Pendaftar Magang ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'certificates'
                ? 'border-[#003049] text-[#003049]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            Terbitkan E-Sertifikat Baru
          </button>
        </div>

        {/* TAB 1: KELOLA PENDAFTAR MAGANG */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Cari nama pemohon, asal sekolah, atau nomor LoA..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#003049] bg-white"
                />
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-xs border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">Nama & Kontak</th>
                      <th className="px-6 py-4">Asal Instansi & Jurusan</th>
                      <th className="px-6 py-4">Periode Magang</th>
                      <th className="px-6 py-4">Berkas CV</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                          Memuat data pendaftar dari Supabase...
                        </td>
                      </tr>
                    ) : filteredApps.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                          Belum ada data pendaftar yang cocok.
                        </td>
                      </tr>
                    ) : (
                      filteredApps.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition">
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-900">{app.full_name || 'Tanpa Nama'}</div>
                            <div className="text-xs text-slate-500">{app.email}</div>
                            <div className="text-xs text-sky-700 font-medium">{app.phone_number}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-slate-800">{app.institution_name || '-'}</div>
                            <div className="text-xs text-slate-500">{app.major || '-'}</div>
                          </td>
                          <td className="px-6 py-4 text-xs">
                            <div>Mulai: <span className="font-semibold">{app.start_period}</span></div>
                            <div>Selesai: <span className="font-semibold">{app.end_period}</span></div>
                          </td>
                          <td className="px-6 py-4">
                            <a
                              href={app.cv_url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:underline"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              Buka CV
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                              app.status === 'approved' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : app.status === 'rejected'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {app.status || 'pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            {app.status !== 'approved' && (
                              <button
                                onClick={() => handleStatusChange(app.id, 'approved')}
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition"
                              >
                                Terima
                              </button>
                            )}
                            {app.status !== 'rejected' && (
                              <button
                                onClick={() => handleStatusChange(app.id, 'rejected')}
                                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition"
                              >
                                Tolak
                              </button>
                            )}
                            <button
                              onClick={() => setSelectedLoa(app)}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold transition"
                            >
                              Lihat LoA
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TERBITKAN SERTIFIKAT BARU */}
        {activeTab === 'certificates' && (
          <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-[#003049] flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-amber-600" />
              Penerbitan E-Sertifikat Resmi
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Sertifikat yang diterbitkan di sini akan langsung tersimpan di tabel <code>certificates</code> Supabase dan dapat diverifikasi secara publik melalui fitur Cek Sertifikat.
            </p>

            {certResult && (
              <div className={`p-4 rounded-xl text-sm mb-6 ${
                certResult.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                <p className="font-semibold">{certResult.message}</p>
                {certResult.code && (
                  <p className="text-xs mt-1">
                    Coba masukkan nomor ini di menu <strong>Cek Sertifikat</strong>: <strong>{certResult.code}</strong>
                  </p>
                )}
              </div>
            )}

            <form onSubmit={handleCreateCert} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap Penerima Sertifikat *
                </label>
                <input
                  type="text"
                  name="recipientName"
                  required
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#003049] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Kegiatan / Program *
                </label>
                <input
                  type="text"
                  name="programTitle"
                  required
                  placeholder="Contoh: Bootcamp Uji Kompetensi Sertifikasi BNSP 2026"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#003049] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor Kode Sertifikat (Opsional, otomatis dibuat jika kosong)
                </label>
                <input
                  type="text"
                  name="certificateCode"
                  placeholder="Contoh: PSA/2026/BNSP/001"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#003049] focus:outline-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={certLoading}
                  className="w-full py-3 rounded-xl bg-[#003049] hover:bg-[#002235] text-white font-bold text-sm transition flex items-center justify-center gap-2"
                >
                  {certLoading ? (
                    <span>Menerbitkan...</span>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>Terbitkan Sertifikat Sekarang</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      {/* Modal Surat Penerimaan (LoA) */}
      {selectedLoa && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-bold text-[#003049] text-base">Surat Penerimaan Magang (LoA)</h3>
                <p className="text-xs text-slate-500">Nomor: {selectedLoa.loa_number || '-'}</p>
              </div>
              <button
                onClick={() => setSelectedLoa(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <p>Dengan ini Punya Skill Academy menerangkan bahwa:</p>
              <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
                <div>Nama: <strong>{selectedLoa.full_name}</strong></div>
                <div>Asal Instansi: <strong>{selectedLoa.institution_name}</strong></div>
                <div>Jurusan: <strong>{selectedLoa.major}</strong></div>
                <div>Periode: <strong>{selectedLoa.start_period} s/d {selectedLoa.end_period}</strong></div>
                <div>Status Seleksi: <strong className="uppercase text-emerald-700">{selectedLoa.status}</strong></div>
              </div>
              <p className="text-slate-500 text-xs">
                Diterbitkan secara digital oleh Manajemen Punya Skill Academy untuk keperluan administrasi surat tugas sekolah/kampus.
              </p>
            </div>

            <div className="flex gap-3 justify-end border-t pt-4">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#003049] text-white rounded-lg text-xs font-bold hover:bg-[#002235]"
              >
                Cetak Dokumen
              </button>
              <button
                onClick={() => setSelectedLoa(null)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
