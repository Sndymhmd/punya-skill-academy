'use client';

import React, { useState } from 'react';
import { Briefcase, Award, GraduationCap, Video, Check, ArrowRight, X, Calendar, FileText, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/lib/config';

export default function ProgramsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'internship' | 'bootcamp' | 'research' | 'webinar'>('all');
  const [selectedProgram, setSelectedProgram] = useState<any | null>(null);

  const programs = [
    {
      id: 'pkl-magang',
      category: 'internship',
      title: 'Program PKL / Magang Industri',
      badge: 'Paling Populer',
      badgeColor: 'bg-sky-100 text-sky-800',
      icon: Briefcase,
      iconColor: 'bg-sky-50 text-sky-700',
      target: 'Siswa SMK & Mahasiswa D3/S1',
      description: 'Program magang terstruktur berbasis real project. Setiap peserta akan terlibat langsung dalam pengembangan aplikasi/karya industri dan mempresentasikannya di Capstone Demo Day.',
      features: [
        'Surat Penerimaan (LoA) Resmi untuk Sekolah/Kampus',
        'Pembimbingan mentor praktisi 1-on-1',
        'Sertifikat Magang & Portofolio Karya Nyata',
        'Capstone Project Demo Day'
      ],
      syllabus: [
        'Minggu 1-2: Onboarding & Pengenalan Arsitektur Perangkat Lunak',
        'Minggu 3-6: Project Sprint I (Frontend & Backend Implementation)',
        'Minggu 7-10: Project Sprint II (Testing, Database Optimization & Security)',
        'Minggu 11-12: Demo Day Capstone Project Presentation & Evaluasi Akhir'
      ],
      ctaText: 'Daftar Magang Sekarang',
      actionType: 'scroll_form'
    },
    {
      id: 'bootcamp-bnsp',
      category: 'bootcamp',
      title: 'Bootcamp & Sertifikasi BNSP',
      badge: 'Sertifikasi Nasional',
      badgeColor: 'bg-amber-100 text-amber-800',
      icon: Award,
      iconColor: 'bg-amber-50 text-amber-700',
      target: 'Mahasiswa, Fresh Graduate & Profesional',
      description: 'Pelatihan intensif berorientasi Standar Kompetensi Kerja Nasional Indonesia (SKKNI) yang diakhiri dengan uji kompetensi oleh Asesor Resmi BNSP.',
      features: [
        'Kurikulum terstandar SKKNI',
        'Persiapan portofolio & berkas asesmen',
        'Simulasi mock interview & ujian praktik',
        'Sertifikat Kompetensi BNSP berlisensi Garuda Emas'
      ],
      syllabus: [
        'Modul 1: Pemetaan Skema Okupasi & Standar SKKNI Bidang Teknologi',
        'Modul 2: Penyusunan Dokumen Bukti Portofolio Asesmen',
        'Modul 3: Uji Praktik Mandiri & Pembahasan Studi Kasus',
        'Modul 4: Uji Kompetensi Langsung di hadapan Asesor BNSP'
      ],
      ctaText: 'Buka Silabus & Detail BNSP',
      actionType: 'modal'
    },
    {
      id: 'riset-ta',
      category: 'research',
      title: 'Pendampingan Riset & Tugas Akhir',
      badge: 'Akademik Terapan',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      icon: GraduationCap,
      iconColor: 'bg-indigo-50 text-indigo-700',
      target: 'Mahasiswa Tingkat Akhir (D3/S1/S2)',
      description: 'Bimbingan terpadu untuk penyusunan proposal, metodologi riset, implementasi arsitektur sistem, serta penyediaan studi kasus industri nyata untuk skripsi.',
      features: [
        'Akses data studi kasus industri',
        'Review arsitektur & metodologi riset',
        'Konsultasi intensif bersama mentor praktisi',
        'Surat keterangan riset untuk kampus'
      ],
      syllabus: [
        'Sesi 1: Bedah Judul, Rumusan Masalah & State of the Art',
        'Sesi 2: Perancangan Arsitektur Sistem & Pemodelan Data',
        'Sesi 3: Validasi Hasil Implementasi & Pengujian Metrik',
        'Sesi 4: Simulasi Sidang Tugas Akhir & Pembuatan Paper Ilmiah'
      ],
      ctaText: 'Detail Bimbingan Riset',
      actionType: 'modal'
    },
    {
      id: 'webinar-talkshow',
      category: 'webinar',
      title: 'Webinar & Talkshow Praktisi',
      badge: 'Networking',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      icon: Video,
      iconColor: 'bg-emerald-50 text-emerald-700',
      target: 'Umum & Pelajar/Mahasiswa',
      description: 'Sesi berbagi wawasan rutin bersama praktisi industri, membahas tren teknologi terkini, tips lolos rekrutmen kerja, dan live Q&A interaktif.',
      features: [
        'E-Sertifikat kehadiran terverifikasi',
        'Akses rekaman & modul presentasi',
        'Sesi tanya jawab interaktif',
        'Grup networking eksklusif'
      ],
      syllabus: [
        'Jadwal Terdekat: Sabtu, Pukul 19.30 WIB via Zoom Meeting',
        'Topik: Menembus Karir Tech & Membangun Portofolio Industri',
        'Pembicara: Tech Lead & Praktisi Industri Nasional',
        'Benefit: E-Sertifikat Resmi & Template CV ATS-Friendly'
      ],
      ctaText: 'Lihat Jadwal & Materi',
      actionType: 'modal'
    }
  ];

  const filteredPrograms = activeTab === 'all' 
    ? programs 
    : programs.filter(p => p.category === activeTab);

  function handleAction(item: any) {
    if (item.actionType === 'scroll_form') {
      window.location.href = '#magang';
    } else {
      setSelectedProgram(item);
    }
  }

  return (
    <section id="program" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs uppercase font-bold tracking-widest text-sky-700">
            Pilar Utama Pelatihan & Karir
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#003049] tracking-tight">
            Program Unggulan Punya Skill Academy
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Pilih jalur pengembangan skill yang paling sesuai dengan target akademik dan karir Anda.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {[
            { id: 'all', label: 'Semua Program' },
            { id: 'internship', label: 'PKL / Magang' },
            { id: 'bootcamp', label: 'Bootcamp & BNSP' },
            { id: 'research', label: 'Riset & Tugas Akhir' },
            { id: 'webinar', label: 'Webinar & Talkshow' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-[#003049] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {filteredPrograms.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl ${item.iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#003049] mt-5">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-sky-700 mt-1">
                    Sasaran: {item.target}
                  </p>

                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-5">
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleAction(item)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#003049] text-white font-semibold text-sm hover:bg-[#002235] transition"
                  >
                    <span>{item.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wide">
                  Detail & Silabus Program
                </span>
                <h3 className="font-bold text-[#003049] text-xl mt-0.5">
                  {selectedProgram.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProgram(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedProgram.description}
            </p>

            {/* Syllabus */}
            <div>
              <h4 className="font-bold text-sm text-[#003049] mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-700" />
                Rincian Kurikulum & Jadwal
              </h4>
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                {selectedProgram.syllabus.map((syl: string, sIdx: number) => (
                  <div key={sIdx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-2 shrink-0"></span>
                    <span>{syl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href="#magang"
                onClick={() => setSelectedProgram(null)}
                className="flex-1 text-center py-3 rounded-xl bg-[#003049] text-white font-bold text-sm hover:bg-[#002235] transition"
              >
                Daftar Program Ini Sekarang
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${siteConfig.defaultWaMessage}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition text-center"
              >
                Hubungi Admin WA
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
