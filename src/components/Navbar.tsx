'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Award, Briefcase, GraduationCap, CheckCircle } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#003049] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              PS
            </div>
            <div>
              <span className="text-lg md:text-xl font-bold text-[#003049] tracking-tight block leading-tight">
                PUNYA SKILL
              </span>
              <span className="text-xs text-sky-700 tracking-wider font-semibold uppercase block">
                ACADEMY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7">
            <a href="#beranda" className="text-sm font-medium text-slate-600 hover:text-[#003049] transition">
              Beranda
            </a>
            <a href="#program" className="text-sm font-medium text-slate-600 hover:text-[#003049] transition">
              Program & BNSP
            </a>
            <a href="#magang" className="text-sm font-medium text-slate-600 hover:text-[#003049] transition">
              Daftar Magang
            </a>
            <Link href="/cek-status" className="text-sm font-semibold text-sky-800 hover:text-[#003049] transition bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
              Cek Status Magang
            </Link>
            <a href="#demoday" className="text-sm font-medium text-slate-600 hover:text-[#003049] transition">
              Demo Day
            </a>
            <a href="#verifikasi" className="text-sm font-medium text-slate-600 hover:text-[#003049] transition flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Cek Sertifikat
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#magang"
              className="px-5 py-2.5 rounded-lg bg-[#003049] text-white text-sm font-semibold hover:bg-[#002235] transition shadow-sm hover:shadow"
            >
              Ajukan Magang
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-[#003049] focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 pt-4 pb-6 space-y-4 shadow-xl">
          <a
            href="#beranda"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-slate-700 hover:text-[#003049]"
          >
            Beranda
          </a>
          <a
            href="#program"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-slate-700 hover:text-[#003049]"
          >
            Program & BNSP
          </a>
          <a
            href="#magang"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-slate-700 hover:text-[#003049]"
          >
            Daftar Magang / PKL
          </a>
          <Link
            href="/cek-status"
            onClick={() => setIsOpen(false)}
            className="block text-base font-semibold text-sky-800 hover:text-[#003049]"
          >
            Cek Status Pendaftaran Magang
          </Link>
          <a
            href="#demoday"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-slate-700 hover:text-[#003049]"
          >
            Demo Day Portofolio
          </a>
          <a
            href="#verifikasi"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-slate-700 hover:text-[#003049]"
          >
            Verifikasi Sertifikat
          </a>
          <div className="pt-2">
            <a
              href="#magang"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-2.5 rounded-lg bg-[#003049] text-white font-semibold text-sm"
            >
              Ajukan Magang Sekarang
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
