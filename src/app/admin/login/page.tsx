'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import { signIn, getUserProfile, logOut } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined, general: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      // Sign in with Firebase
      const user = await signIn(formData.email, formData.password);

      // Check if user is admin
      const profile = await getUserProfile(user.uid);

      if (profile?.role !== 'admin') {
        // Not an admin — sign them out immediately
        await logOut();
        setErrors({ general: 'Access denied. You are not an admin.' });
        return;
      }

      setSuccessMessage('Access granted! Redirecting to admin panel...');
      setTimeout(() => router.push('/admin-panel'), 2000);
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
        setErrors({ general: 'Invalid credentials. Access denied.' });
      } else {
        setErrors({ general: 'Something went wrong. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          style={{
            backgroundImage: 'linear-gradient(rgba(255,204,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,204,0,0.5) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <AppLogo size={40} />
            <div className="text-left">
              <p className="font-bold text-xl text-white tracking-tight">MTNInvest</p>
              <p className="text-xs text-mtn-yellow font-semibold">Admin Portal</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-full px-4 py-1.5 text-xs font-semibold">
            <Shield size={12} />
            Restricted Access — Authorized Personnel Only
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Admin Sign In</h2>
          <p className="text-sm text-gray-500 mb-6">Enter your admin credentials to continue</p>

          {successMessage && (
            <div className="mb-4 flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700">
              <CheckCircle size={16} className="shrink-0 text-emerald-500" />
              {successMessage}
            </div>
          )}

          {errors.general && (
            <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              <AlertCircle size={16} className="shrink-0" />
              {errors.general}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Admin Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@mtninvest.com"
                className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow ${
                  errors.email ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-11 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow ${
                    errors.password ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading || !!successMessage}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Shield size={16} />
              {isLoading ? 'Verifying...' : 'Sign In to Admin Panel'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          Not an admin?{' '}
          <a href="/signin" className="text-mtn-yellow hover:underline font-semibold">
            Go to investor login
          </a>
        </p>
      </div>
    </div>
  );
}