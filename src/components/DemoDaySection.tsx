'use client';

import React from 'react';
import { ExternalLink, Code2, Sparkles, Layers } from 'lucide-react';

export default function DemoDaySection() {
  const capstoneProjects = [
    {
      title: 'EduCourse LMS & Sertifikasi BNSP',
      team: 'Tim Alpha (SMK & Poltek)',
      category: 'Web App & Fullstack',
      description: 'Platform manajemen materi pembelajaran online dilengkapi kuis interaktif, tracking progress siswa, dan portal validasi sertifikat BNSP.',
      tags: ['Next.js', 'Supabase', 'Tailwind CSS', 'PostgreSQL'],
      demoUrl: '#',
      repoUrl: '#'
    },
    {
      title: 'Smart Inventory & POS Dashboard',
      team: 'Tim Beta (Mahasiswa D4/S1)',
      category: 'Enterprise App',
      description: 'Sistem kasir dan manajemen stok pergudangan real-time dengan pencatatan laba rugi otomatis dan notifikasi barang menipis via WhatsApp API.',
      tags: ['Laravel', 'MySQL', 'Livewire', 'Alpine.js'],
      demoUrl: '#',
      repoUrl: '#'
    },
    {
      title: 'HealthCare Clinic Appointment System',
      team: 'Tim Gamma (Siswa SMK Telkom)',
      category: 'UI/UX & Frontend',
      description: 'Aplikasi reservasi jadwal temu dokter klinik, tracking antrean pasien digital, dan riwayat rekam medis terenkripsi.',
      tags: ['React.js', 'Figma', 'Node.js', 'REST API'],
      demoUrl: '#',
      repoUrl: '#'
    }
  ];

  return (
    <section id="demoday" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Capstone Project Demo Day</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#003049] tracking-tight">
            Karya Nyata Peserta Magang
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Di Punya Skill Academy, peserta magang dan bootcamp tidak hanya belajar teori, tetapi membangun produk nyata yang dipamerkan di acara Demo Day.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {capstoneProjects.map((project, idx) => (
            <div
              key={idx}
              className="group bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-sky-300 hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-sky-700">{project.category}</span>
                  <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">{project.team}</span>
                </div>

                <h3 className="text-lg font-bold text-[#003049] group-hover:text-sky-700 transition">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 text-[11px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold">
                <span className="text-emerald-700 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Lulus Asesmen Demo Day
                </span>
                <span className="text-[#003049] group-hover:translate-x-0.5 transition inline-flex items-center gap-1">
                  Detail <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
