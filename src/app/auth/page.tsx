'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authAPI } from '@/lib/supabaseClient';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(searchParams.get('signup') === 'true');
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const token = authAPI.getToken();
      if (token) {
        const user = await authAPI.getMe();
        if (user && !user.message) {
          setIsSignedIn(true);
          router.push('/dashboard');
        }
      }
    };
    checkSession();
  }, [router]);

  const handleSignUp = async () => {
    if (!email || !password) {
      setMessage('Please fill in all fields');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const data = await authAPI.register(email, password, name);
      if (data.token) {
        authAPI.setToken(data.token);
        setMessage('Account created successfully! Redirecting...');
        setTimeout(() => router.push('/dashboard'), 1000);
      } else {
        setMessage(`Sign up error: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage('Sign up error: Network request failed');
    }
    setLoading(false);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      setMessage('Please fill in all fields');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const data = await authAPI.login(email, password);
      if (data.token) {
        authAPI.setToken(data.token);
        setMessage('Signed in successfully! Redirecting...');
        setTimeout(() => router.push('/dashboard'), 1000);
      } else {
        setMessage(`Sign in error: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage('Sign in error: Network request failed');
    }
    setLoading(false);
  };

  if (isSignedIn) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="mx-auto max-w-lg rounded-[2rem] bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40 ring-1 ring-slate-700/80 text-center">
          <h1 className="text-3xl font-semibold text-white">Already signed in</h1>
          <p className="mt-3 text-sm text-slate-400">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg rounded-[2rem] bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40 ring-1 ring-slate-700/80">
        <h1 className="text-3xl font-semibold text-white">{isSignUp ? 'Create account' : 'Sign in'}</h1>
        <p className="mt-3 text-sm text-slate-400">
          {isSignUp 
            ? 'Join StudySync to find collaborators and build amazing projects.'
            : 'Use email and password to access your StudySync dashboard.'}
        </p>

        <div className="mt-8 space-y-4">
          {isSignUp && (
            <label className="block">
              <span className="text-sm text-slate-300">Full Name</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                placeholder="Your name"
              />
            </label>
          )}
          <label className="block">
            <span className="text-sm text-slate-300">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              placeholder="Your password"
            />
          </label>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={isSignUp ? handleSignUp : handleSignIn}
            disabled={loading}
            className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Processing...' : (isSignUp ? 'Register' : 'Sign in')}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage('');
              setName('');
            }}
            disabled={loading}
            className="rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSignUp ? 'Sign in instead' : 'Create account'}
          </button>
        </div>

        {message ? (
          <p className={`mt-4 text-sm ${message.includes('error') ? 'text-red-400' : 'text-sky-300'}`}>
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
}
