'use client';

import React, { FormEvent, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, Sparkles } from 'lucide-react';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);
    if (!error) setSent(true);
    else alert(error.message);
  };

  // After sending link
  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 grid place-items-center">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 shadow-lg text-center">
          <Sparkles className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-light text-slate-800">Check your inbox!</h2>
          <p className="text-slate-600 mt-2">
            We sent a magic link to <span className="font-semibold">{email}</span>.
          </p>
          <p className="text-sm text-slate-500 mt-4">
            Click the link to finish signing in.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute -top-2 -right-2">
              <Sparkles className="h-6 w-6 text-blue-400 animate-pulse" />
            </div>
            <h1 className="text-4xl font-light tracking-tight text-slate-800 leading-tight">
              Welcome to{' '}
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Clairon
              </span>
            </h1>
          </div>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Enter your email to receive a secure sign-in link
          </p>
        </div>

        {/* Sign-In Card */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 bg-white/80"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-60 text-white rounded-2xl transition-all transform hover:-translate-y-1 hover:shadow-xl font-medium text-lg"
            >
              {loading ? 'Sending…' : 'Send Magic Link →'}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-600 text-sm">
            Your mental health matters. Take it one day at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;