'use server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Dapatkan seluruh pendaftar magang dari database
export async function getInternshipApplications() {
  const { data, error } = await supabase
    .from('internship_applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching applications:', error);
    return [];
  }
  return data || [];
}

// Update status pendaftar (Approve / Reject)
export async function updateApplicationStatus(id: string, status: 'approved' | 'rejected', reason?: string) {
  const { data, error } = await supabase
    .from('internship_applications')
    .update({
      status,
      rejection_reason: reason || null
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true, message: `Status berhasil diubah menjadi ${status.toUpperCase()}!` };
}

// Buat Sertifikat Baru untuk Peserta
export async function createNewCertificate(formData: FormData) {
  const recipientName = formData.get('recipientName') as string;
  const programTitle = formData.get('programTitle') as string;
  const customCode = formData.get('certificateCode') as string || `PSA/2026/CERT/${Math.floor(1000 + Math.random() * 9000)}`;

  if (!recipientName || !programTitle) {
    return { success: false, message: 'Nama peserta dan program wajib diisi.' };
  }

  // 1. Pastikan ada dummy profile / profile peserta
  const dummyProfileId = crypto.randomUUID();
  await supabase.from('profiles').upsert({
    id: dummyProfileId,
    full_name: recipientName,
    role: 'student'
  });

  // 2. Pastikan ada program
  let { data: program } = await supabase
    .from('programs')
    .select('id')
    .ilike('title', `%${programTitle}%`)
    .limit(1)
    .maybeSingle();

  if (!program) {
    const { data: newProg } = await supabase
      .from('programs')
      .insert({
        title: programTitle,
        slug: programTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: 'bootcamp_bnsp',
        is_active: true
      })
      .select('id')
      .single();
    program = newProg;
  }

  // 3. Masukkan ke tabel certificates
  const { data: cert, error } = await supabase
    .from('certificates')
    .insert({
      certificate_code: customCode,
      user_id: dummyProfileId,
      program_id: program?.id,
      issue_date: new Date().toISOString().split('T')[0]
    })
    .select()
    .single();

  if (error) {
    return { success: false, message: 'Gagal membuat sertifikat: ' + error.message };
  }

  return {
    success: true,
    message: `Sertifikat berhasil diterbitkan! Nomor Kode: ${customCode}`,
    certificateCode: customCode
  };
}
