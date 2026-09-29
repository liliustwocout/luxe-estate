'use client';

export interface AdminSession {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

const DEFAULT_ADMIN: AdminSession = {
  id: 'admin-1',
  name: 'Alexander Wright',
  email: 'admin@luxeestate.vn',
  role: 'Super Admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80',
};

const STORAGE_KEY = 'luxe_admin_auth';
const COOKIE_NAME = 'luxe_admin_session';

export function getAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function loginAdmin(email: string, pass: string): { success: boolean; error?: string; session?: AdminSession } {
  // Demo authentication check
  if ((email === 'admin@luxeestate.vn' || email === 'admin') && pass === 'admin123') {
    const session = DEFAULT_ADMIN;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      document.cookie = `${COOKIE_NAME}=authenticated; path=/; max-age=86400; SameSite=Lax`;
    } catch {
      // ignore
    }
    return { success: true, session };
  }

  // Also allow quick development login with any non-empty input if testing
  if (email.includes('@') && pass.length >= 6) {
    const session: AdminSession = {
      id: 'admin-custom',
      name: email.split('@')[0].toUpperCase(),
      email,
      role: 'Property Manager',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80',
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      document.cookie = `${COOKIE_NAME}=authenticated; path=/; max-age=86400; SameSite=Lax`;
    } catch {
      // ignore
    }
    return { success: true, session };
  }

  return { success: false, error: 'Email hoặc mật khẩu không chính xác. Mẹo: Dùng admin@luxeestate.vn / admin123' };
}

export function logoutAdmin(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  } catch {
    // ignore
  }
}
