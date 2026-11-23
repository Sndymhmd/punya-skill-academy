'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, FileText, Calendar, Building, User, Mail, Phone, ExternalLink, Briefcase } from 'lucide-react';
import { submitInternshipApplication } from '@/app/actions/internship';

export default function InternshipForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; loaNumber?: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const res = await submitInternshipApplication(formData);
    setResult(res);
    setLoading(false);

    if (res.success) {
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <section id="magang" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-[#003049] text-xs font-semibold">
            <Building className="w-4 h-4 text-sky-700" />
            <span>Penerimaan Batch 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#003049]">
            Formulir Pendaftaran PKL / Magang
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Isi formulir di bawah ini untuk mengajukan permohonan magang atau PKL di Punya Skill Academy. Terbuka untuk siswa SMK dan mahasiswa seluruh Indonesia.
          </p>
        </div>

        {/* Feedback Alert */}
        {result && (
          <div className={`mb-8 p-4 rounded-xl flex items-start gap-3 ${
            result.success ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}>
            {result.success ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
            )}
            <div>
              <p className="font-semibold text-sm">{result.message}</p>
              {result.loaNumber && (
                <p className="text-xs mt-1 text-emerald-700">
                  Nomor Registrasi Sementara Anda: <strong>{result.loaNumber}</strong>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* PILIHAN PROGRAM & DIVISI */}
            <div>
              <h3 className="text-base font-bold text-[#003049] flex items-center gap-2 mb-4">
                <Briefcase className="w-4 h-4 text-sky-700" />
                Pilihan Program & Divisi Magang
              </h3>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pilih Program / Jalur Peminatan Magang *
                </label>
                <select
                  name="programTrack"
                  required
                  defaultValue="Frontend Web Developer (React / Next.js)"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#003049] focus:outline-none bg-white font-medium text-slate-800"
                >
                  <option value="Frontend Web Developer (React / Next.js)">
                    💻 Frontend Web Developer (React / Next.js / Tailwind CSS)
                  </option>
                  <option value="Backend Developer (Node.js / Laravel / Database)">
                    ⚙️ Backend & Database Engineer (Node.js / Laravel / PostgreSQL)
                  </option>
                  <option value="UI/UX & Product Design (Figma)">
                    🎨 UI/UX & Product Designer (Figma / Prototyping / Wireframing)
                  </option>
                  <option value="Bootcamp & Persiapan Uji Sertifikasi BNSP">
                    🏅 Bootcamp & Persiapan Sertifikasi BNSP (Standar SKKNI)
                  </option>
                  <option value="Pendampingan Riset & Skripsi Tugas Akhir">
                    🔬 Pendampingan Riset & Skripsi Tugas Akhir Terapan
                  </option>
                  <option value="Digital Marketing & Content Creator">
                    📱 Digital Marketing, Sosmed & Creative Content Specialist
                  </option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Pilihlah divisi yang paling sesuai dengan keahlian atau target kompetensi yang ingin Anda kuasai.
                </p>
              </div>
            </div>

            {/* Identitas Diri */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-base font-bold text-[#003049] flex items-center gap-2 mb-4">
                <User className="w-4 h-4 text-sky-700" />
                Informasi Pemohon
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Contoh: Muhammad Ihsan"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#003049] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Aktif *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="nama@email.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#003049] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nomor WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="0812xxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#003049] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Jenjang Instansi *
                  </label>
                  <select
                    name="institutionType"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#003049] focus:outline-none"
                  >
                    <option value="SMK">Siswa SMK / Sederajat</option>
                    <option value="Universitas">Mahasiswa (D3 / D4 / S1)</option>
                    <option value="Umum">Umum / Fresh Graduate</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Asal Sekolah / Kampus */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-base font-bold text-[#003049] flex items-center gap-2 mb-4">
                <Building className="w-4 h-4 text-sky-700" />
                Asal Sekolah / Kampus
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Sekolah / Universitas *
                  </label>
                  <input
                    type="text"
                    name="institutionName"
                    required
                    placeholder="Contoh: SMKN 1 Jakarta / Universitas Brawijaya"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#003049] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Jurusan / Program Studi *
                  </label>
                  <input
                    type="text"
                    name="major"
                    required
                    placeholder="Contoh: Rekayasa Perangkat Lunak / Teknik Informatika"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#003049] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Rencana Periode Magang */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-base font-bold text-[#003049] flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-sky-700" />
                Rencana Periode Magang
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tanggal Mulai *
                  </label>
                  <input
                    type="date"
                    name="startPeriod"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#003049] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tanggal Selesai *
                  </label>
                  <input
                    type="date"
                    name="endPeriod"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#003049] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Berkas & Portofolio */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-base font-bold text-[#003049] flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-sky-700" />
                Berkas & Portofolio (Tautan Online)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Link CV / Resume (Google Drive / LinkedIn) *
                  </label>
                  <input
                    type="url"
                    name="cvUrl"
                    required
                    placeholder="https://drive.google.com/..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#003049] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Link Portofolio / GitHub (Opsional)
                  </label>
                  <input
                    type="url"
                    name="portfolioLink"
                    placeholder="https://github.com/username atau figma.com/..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#003049] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Tombol Submit */}
            <div className="pt-6 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#003049] hover:bg-[#002235] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition disabled:opacity-60"
              >
                {loading ? (
                  <span>Mengirimkan pendaftaran...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Pendaftaran Magang Sekarang</span>
                  </>
                )}
              </button>
              <p className="text-center text-xs text-slate-500 mt-3">
                Data Anda terenkripsi dan disimpan langsung secara aman di server Supabase Punya Skill Academy.
              </p>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
