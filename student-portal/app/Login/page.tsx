'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      setError('Email hoặc mật khẩu không chính xác.');
      setLoading(false);
      return;
    }

    const newSessionId = uuidv4();
    localStorage.setItem('user_session_id', newSessionId);

    await supabase
      .from('profiles')
      .update({ current_session_id: newSessionId, updated_at: new Date().toISOString() })
      .eq('id', authData.user.id);

    setLoading(false);
    router.push('/khoa-hoc');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-2xl max-w-md w-full space-y-5"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 text-red-500 rounded-2xl mx-auto flex items-center justify-center">
            <Lock size={22} />
          </div>
          <h2 className="text-2xl font-black text-white">ĐĂNG NHẬP</h2>
          <p className="text-xs text-neutral-400">1 tài khoản chỉ được mở trên 1 thiết bị duy nhất</p>
        </div>

        {error && (
          <p className="text-red-400 text-xs bg-red-950/50 border border-red-800/60 p-3 rounded-xl text-center">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1">Email học viên</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-red-600 transition"
              placeholder="name@domain.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-red-600 transition"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.4)] transition duration-200 text-sm disabled:opacity-50"
        >
          {loading ? 'Đang xác thực...' : 'Truy Cập Vào Học'}
        </button>
      </form>
    </div>
  );
}