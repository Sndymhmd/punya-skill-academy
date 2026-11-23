import { createClient } from '@/lib/supabase/client';

export async function seedInitialPrograms() {
  const supabase = createClient();
  
  const initialData = [
    {
      title: 'Program PKL & Magang Industri (Batch 2026)',
      slug: 'magang-industri-batch-2026',
      category: 'internship',
      description: 'Program magang berbasis project nyata untuk siswa SMK dan mahasiswa aktif dengan pembimbingan mentor praktisi.',
      curriculum_summary: 'Frontend, Backend, UI/UX Design, Project Management, Capstone Demo Day.',
      quota: 30,
      price: 0,
      is_active: true
    },
    {
      title: 'Bootcamp Intensif & Uji Kompetensi Sertifikasi BNSP',
      slug: 'bootcamp-sertifikasi-bnsp',
      category: 'bootcamp_bnsp',
      description: 'Pelatihan intensif persiapan sertifikasi profesi resmi Badan Nasional Sertifikasi Profesi (BNSP).',
      curriculum_summary: 'Pemahaman SKKNI, Portofolio Asesmen, Mock Interview, Ujian Asesor BNSP.',
      quota: 25,
      price: 150000,
      is_active: true
    },
    {
      title: 'Pendampingan Riset & Tugas Akhir Terapan',
      slug: 'pendampingan-riset-ta',
      category: 'research_mentorship',
      description: 'Bimbingan khusus untuk mahasiswa yang membutuhkan studi kasus nyata dan data riset untuk skripsi/tugas akhir.',
      curriculum_summary: 'Problem Formulation, Methodology, Real Case Data, System Architecture Review.',
      quota: 15,
      price: 0,
      is_active: true
    },
    {
      title: 'Webinar & Talkshow: Peluang Karir Tech & Industri Kreatif',
      slug: 'webinar-karir-tech-2026',
      category: 'webinar',
      description: 'Bedah peluang karir dan strategi masuk industri teknologi langsung dari para profesional ternama.',
      curriculum_summary: 'Resume Review, Tech Landscape, Networking Session, E-Sertifikat Resmi.',
      quota: 200,
      price: 0,
      is_active: true
    }
  ];

  const { data, error } = await supabase.from('programs').upsert(initialData, { onConflict: 'slug' });
  return { data, error };
}
