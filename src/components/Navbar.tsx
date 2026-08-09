'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/supabaseClient';
import { LogOut } from 'lucide-react';

export function Navbar() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const token = authAPI.getToken();
      if (token) {
        try {
          const user = await authAPI.getMe();
          if (user && user._id) {
            setUserEmail(user.email);
            setUserName(user.name);
            setIsSignedIn(true);
          } else {
            authAPI.clearToken();
            setIsSignedIn(false);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          authAPI.clearToken();
          setIsSignedIn(false);
        }
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      setUserEmail(null);
      setUserName(null);
      setIsSignedIn(false);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-3 text-lg font-semibold text-white">
          <span>StudySync</span>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-sky-300">Beta</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm text-slate-300">
          {isSignedIn ? (
            <>
              <Link href="/dashboard" className="rounded-full bg-slate-900 px-4 py-2 transition hover:bg-slate-800">
                Dashboard
              </Link>
              <div className="rounded-full bg-slate-800 px-4 py-2 text-slate-200">
                {userName || userEmail}
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-slate-100 transition hover:bg-red-700"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="rounded-full bg-slate-900 px-4 py-2 transition hover:bg-slate-800">
                Dashboard
              </Link>
              <Link href="/auth" className="rounded-full bg-sky-500 px-4 py-2 text-slate-950 transition hover:bg-sky-400">
                Sign in
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
