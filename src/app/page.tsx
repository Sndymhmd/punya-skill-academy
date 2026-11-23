import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProgramsSection from '@/components/ProgramsSection';
import DemoDaySection from '@/components/DemoDaySection';
import InternshipForm from '@/components/InternshipForm';
import VerifyCertificate from '@/components/VerifyCertificate';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Punya Skill Academy - Pelatihan & Karir (PKL, BNSP, & Riset)',
  description: 'Wadah pelatihan dan karir terdepan untuk siswa SMK dan mahasiswa. Program PKL/Magang berbasis real project, Sertifikasi BNSP, dan pendampingan riset tugas akhir.',
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Hero />
      <ProgramsSection />
      <InternshipForm />
      <DemoDaySection />
      <VerifyCertificate />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
