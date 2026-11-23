'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Building2, Award, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section id="beranda" className="pt-28 md:pt-36 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#E0F0FF]/40 via-white to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F0FF] text-[#003049] text-xs md:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Selamat Datang di Rumah Kedua Kamu</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#003049] tracking-tight leading-[1.15]">
              Tingkatkan Kapasitas Diri di{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003049] to-[#006494]">
                Punya Skill Academy
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Wadah pelatihan & karir untuk siswa SMK dan mahasiswa. Ikuti program <strong>PKL / Magang berbasis real project</strong>, <strong>Bootcamp Sertifikasi BNSP</strong>, hingga pendampingan <strong>Riset Tugas Akhir</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#magang"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#003049] text-white font-semibold hover:bg-[#002235] transition shadow-md hover:shadow-lg text-base"
              >
                <span>Daftar Magang / PKL</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#program"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition text-base"
              >
                Lihat Semua Program
              </a>
            </div>

            {/* Benefit Checkmarks */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Project-Based Learning Nyata</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sertifikasi Standar BNSP</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Demo Day & Portofolio Karir</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Mentor Praktisi Berpengalaman</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Card Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Decorative Blur Background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-[#003049] rounded-3xl blur-xl opacity-25"></div>

              {/* Main Card */}
              <div className="relative bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-sky-50 text-sky-700">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#003049]">Punya Skill Career Hub</h3>
                      <p className="text-xs text-slate-500">Pelatihan, Magang & Riset</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    Batch Aktif
                  </span>
                </div>

                {/* Highlight items */}
                <div className="space-y-3.5">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-sky-200 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-[#003049]">PKL / Magang SMK & Mahasiswa</h4>
                        <p className="text-xs text-slate-500">Bangun capstone project siap kerja</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-sky-200 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-[#003049]">Bootcamp Uji Sertifikasi BNSP</h4>
                        <p className="text-xs text-slate-500">Pengakuan kompetensi profesi nasional</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-sky-200 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-[#003049]">Kebutuhan Riset & Tugas Akhir</h4>
                        <p className="text-xs text-slate-500">Pendampingan studi kasus industri</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Community Stats */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-sky-600" />
                    <span>3,500+ Komunitas</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Standar BNSP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
