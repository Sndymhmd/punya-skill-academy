'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Kata sandi default untuk akses administrator Punya Skill Academy
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'admin123';

export async function adminLogin(formData: FormData) {
  const secretKey = formData.get('secretKey') as string;

  if (secretKey === ADMIN_SECRET_KEY) {
    const cookieStore = await cookies();
    cookieStore.set('psa_admin_token', 'psa_authenticated_admin_session', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 jam
      path: '/'
    });

    return { success: true };
  }

  return { success: false, message: 'Kunci Akses / PIN Administrator salah.' };
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete('psa_admin_token');
  redirect('/admin/login');
}

export async function verifyAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('psa_admin_token');
  return token?.value === 'psa_authenticated_admin_session';
}
