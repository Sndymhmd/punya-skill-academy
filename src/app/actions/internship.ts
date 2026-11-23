'use server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function submitInternshipApplication(formData: FormData) {
  try {
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const institutionType = formData.get('institutionType') as string;
    const institutionName = formData.get('institutionName') as string;
    const major = formData.get('major') as string;
    const programTrack = (formData.get('programTrack') as string) || 'Frontend Web Developer (React / Next.js)';
    const startPeriod = formData.get('startPeriod') as string;
    const endPeriod = formData.get('endPeriod') as string;
    const portfolioLink = (formData.get('portfolioLink') as string) || '-';
    const cvUrl = (formData.get('cvUrl') as string) || 'https://drive.google.com/uploaded-cv';

    if (!fullName || !email || !phone || !institutionName || !major || !startPeriod || !endPeriod) {
      return { success: false, message: 'Harap lengkapi semua kolom yang wajib diisi.' };
    }

    // 1. Dapatkan atau buat data program sesuai pilihan track
    let { data: program } = await supabase
      .from('programs')
      .select('id')
      .ilike('title', `%${programTrack.split('(')[0].trim()}%`)
      .limit(1)
      .maybeSingle();

    if (!program) {
      const { data: newProg } = await supabase
        .from('programs')
        .insert({
          title: `Magang & PKL - ${programTrack}`,
          slug: `magang-${programTrack.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          category: programTrack.includes('BNSP') ? 'bootcamp_bnsp' : programTrack.includes('Riset') ? 'research_mentorship' : 'internship',
          description: `Program magang divisi ${programTrack} berbasis real project industri.`,
          quota: 30,
          is_active: true
        })
        .select('id')
        .single();
      
      program = newProg;
    }

    const loaCode = `PSA/LOA/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;
    const formattedMajor = `${major} (Divisi: ${programTrack})`;

    // 2. Simpan pendaftaran ke Supabase
    const { data: appData, error: appError } = await supabase
      .from('internship_applications')
      .insert({
        program_id: program?.id,
        cv_url: cvUrl,
        recommendation_letter_url: 'Menyusul / Google Drive',
        portfolio_link: portfolioLink,
        start_period: startPeriod,
        end_period: endPeriod,
        status: 'pending',
        loa_number: loaCode,
        full_name: fullName,
        email: email,
        phone_number: phone,
        institution_name: institutionName,
        major: formattedMajor
      })
      .select('id, loa_number')
      .single();

    if (appError) {
      console.error('Insert error:', appError);
      return { success: false, message: 'Gagal mengirim pendaftaran: ' + appError.message };
    }

    // 3. INTEGRASI n8n AUTOMATION (Kirim ke Webhook n8n)
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      try {
        const payload = {
          applicationId: appData?.id,
          fullName: fullName,
          email: email,
          phoneNumber: phone,
          institutionType: institutionType,
          institutionName: institutionName,
          major: major,
          programTrack: programTrack,
          startPeriod: startPeriod,
          endPeriod: endPeriod,
          portfolioLink: portfolioLink,
          cvUrl: cvUrl,
          loaNumber: loaCode,
          status: 'pending',
          submittedAt: new Date().toISOString()
        };

        // Kirim request POST ke n8n
        fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        }).catch(err => console.error('n8n background trigger error:', err));
        
      } catch (n8nErr) {
        console.error('Failed to trigger n8n:', n8nErr);
      }
    }

    return {
      success: true,
      message: `Pendaftaran berhasil terkirim untuk Divisi: ${programTrack}! Data pendaftaran otomatis terintegrasi ke sistem dan bot notifikasi.`,
      applicationId: appData?.id,
      loaNumber: appData?.loa_number
    };
  } catch (err: any) {
    console.error('Server action error:', err);
    return { success: false, message: 'Terjadi kesalahan sistem: ' + (err?.message || 'Unknown error') };
  }
}

// Fitur Cek Status Pendaftaran oleh Peserta
export async function checkApplicationStatus(query: string) {
  try {
    const cleanQuery = query.trim();
    if (!cleanQuery) {
      return { success: false, message: 'Harap masukkan nomor WhatsApp, Email, atau Nomor LoA Anda.' };
    }

    // Cari berdasarkan phone_number, email, atau loa_number
    const { data, error } = await supabase
      .from('internship_applications')
      .select('*, programs(title, category)')
      .or(`phone_number.ilike.%${cleanQuery}%,email.ilike.%${cleanQuery}%,loa_number.ilike.%${cleanQuery}%`)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error checking status:', error);
      return { success: false, message: 'Terjadi kesalahan saat mencari data: ' + error.message };
    }

    if (!data) {
      return { 
        success: false, 
        notFound: true,
        message: 'Data pendaftaran tidak ditemukan. Pastikan nomor WhatsApp atau Email yang Anda masukkan sama persis dengan saat mendaftar.' 
      };
    }

    return {
      success: true,
      application: data
    };
  } catch (err: any) {
    return { success: false, message: 'Terjadi kendala server: ' + err.message };
  }
}
