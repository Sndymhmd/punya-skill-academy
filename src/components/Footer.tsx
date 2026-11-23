import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import { siteConfig } from '@/lib/config';

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#003049] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#003049] flex items-center justify-center font-bold text-lg">
                PS
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight block leading-tight">
                  PUNYA SKILL
                </span>
                <span className="text-xs text-sky-300 tracking-wider font-semibold uppercase block">
                  ACADEMY
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Komunitas pengembangan diri dan lembaga pelatihan karir terdepan. Menyelenggarakan program PKL/Magang SMK & Mahasiswa berbasis project, persiapan Sertifikasi BNSP, pendampingan riset tugas akhir, dan webinar industri.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition text-sky-300"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition text-sky-300"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${siteConfig.defaultWaMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition text-sky-300"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-sky-300">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#beranda" className="hover:text-white transition">Beranda</a>
              </li>
              <li>
                <a href="#program" className="hover:text-white transition">Program & Silabus BNSP</a>
              </li>
              <li>
                <a href="#magang" className="hover:text-white transition">Pendaftaran PKL / Magang</a>
              </li>
              <li>
                <a href="#demoday" className="hover:text-white transition">Showcase Demo Day</a>
              </li>
              <li>
                <a href="#verifikasi" className="hover:text-white transition">Cek Validitas Sertifikat</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-sky-300">
              Hubungi Kami
            </h4>
            <div className="space-y-2.5 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-sky-300 shrink-0 mt-1" />
                <a 
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${siteConfig.defaultWaMessage}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition"
                >
                  {siteConfig.whatsappDisplay} (WhatsApp Resmi)
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-300 shrink-0 mt-1" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <InstagramIcon className="w-4 h-4 text-sky-300 shrink-0 mt-1" />
                <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-white transition">
                  {siteConfig.instagram}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 PUNYA SKILL ACADEMY. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Dibuat untuk Pelatihan & Karir Generasi Muda Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
