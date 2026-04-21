'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import LandingNav from '../landing-page/components/LandingNav';
import LandingFooter from '../landing-page/components/LandingFooter';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const validate = (): boolean => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrorMessage('');
    try {
      // TODO: Replace with actual API call
      await new Promise(res => setTimeout(res, 1500));
      setSuccessMessage(`We've sent a password reset link to ${email}. Check your inbox and follow the instructions.`);
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-mtn-gray-50">
      <LandingNav />

      <main className="flex-grow flex flex-col justify-center pt-24 pb-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">

          {/* Back link */}
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 mb-8 transition-colors duration-150"
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-mtn-yellow rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail size={28} className="text-black" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-mtn-gray-900">
              Forgot Password?
            </h2>
            <p className="mt-2 text-sm text-mtn-gray-600 max-w-xs mx-auto">
              No worries! Enter your email and we'll send you a reset link.
            </p>
          </div>

          <div className="bg-white py-8 px-4 shadow-card rounded-xl sm:px-10 border border-mtn-gray-200">

            {/* Success state */}
            {successMessage ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={32} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900 mb-2">Check your email!</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{successMessage}</p>
                </div>
                <div className="pt-2 space-y-3">
                  <p className="text-xs text-gray-400">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                  <button
                    onClick={() => { setSuccessMessage(''); setEmail(''); }}
                    className="text-sm font-semibold text-mtn-gray-900 hover:underline"
                  >
                    Try a different email
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Error message */}
                {errorMessage && (
                  <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                    <AlertCircle size={16} className="shrink-0" />
                    {errorMessage}
                  </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-mtn-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      title="Your email address"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        setEmailError('');
                      }}
                      placeholder="name@email.com"
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow ${
                        emailError ? 'border-red-400' : 'border-mtn-gray-300'
                      }`}
                    />
                    {emailError && (
                      <p className="mt-1 text-xs text-red-500">{emailError}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-mtn-yellow text-black font-bold text-sm hover:bg-mtn-yellow-dark transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Mail size={16} />
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-mtn-gray-600">
                    Remember your password?{' '}
                    <Link href="/signin" className="font-bold text-mtn-gray-900 hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}