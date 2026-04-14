'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Menu, X } from 'lucide-react';

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'link-products', label: 'Products', href: '/#products' },
    { id: 'link-how', label: 'How It Works', href: '/#how-it-works' },
    { id: 'link-rates', label: 'Interest Rates', href: '/#products' },
    { id: 'link-faq', label: 'FAQ', href: '/#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <AppLogo size={36} />
          <span className="font-bold text-xl text-gray-900 tracking-tight">MTNInvest</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks?.map(link => (
            <Link
              key={link?.id}
              href={link?.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-150"
            >
              {link?.label}
            </Link>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/signin"
            className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-4 py-2 rounded-xl transition-all duration-150 hover:bg-gray-100"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="text-sm font-semibold bg-mtn-yellow text-black px-5 py-2 rounded-xl hover:bg-mtn-yellow-dark transition-all duration-150 active:scale-95 shadow-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-150"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3 animate-slide-up">
          {navLinks?.map(link => (
            <Link
              key={`mobile-${link?.id}`}
              href={link?.href}
              className="block text-sm font-medium text-gray-700 py-2 hover:text-gray-900"
              onClick={() => setMobileOpen(false)}
            >
              {link?.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/signin"
              className="text-center text-sm font-semibold text-gray-700 px-4 py-2.5 border border-gray-200 rounded-xl"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="text-center text-sm font-semibold bg-mtn-yellow text-black px-4 py-2.5 rounded-xl"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}