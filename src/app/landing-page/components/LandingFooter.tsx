'use client';
import React from 'react';
import Link from 'next/link';
import AppLogo from '../../../components/ui/AppLogo';
import { Share2, X, AtSign, Globe } from 'lucide-react';
import type { FC, SVGProps } from 'react';

type IconComponent = FC<SVGProps<SVGSVGElement> & { size?: number | string }>;

interface SocialLink {
  id: string;
  IconComponent: IconComponent;
  label: string;
}

const socialLinks: SocialLink[] = [
  { id: 'soc-fb', IconComponent: Share2 as IconComponent, label: 'Facebook' },
  { id: 'soc-tw', IconComponent: X as IconComponent,      label: 'X (Twitter)' },
  { id: 'soc-ig', IconComponent: AtSign as IconComponent, label: 'Instagram' },
  { id: 'soc-li', IconComponent: Globe as IconComponent,  label: 'LinkedIn' },
];

const footerLinks = {
  Products: [
    { id: 'f-fd',    label: 'Fixed Deposits',    href: '#products' },
    { id: 'f-sp',    label: 'Savings Plans',      href: '#products' },
    { id: 'f-rates', label: 'Interest Rates',     href: '#products' },
    { id: 'f-calc',  label: 'Returns Calculator', href: '#' },
  ],
  Company: [
    { id: 'f-about',   label: 'About MTNInvest', href: '#' },
    { id: 'f-careers', label: 'Careers',         href: '#' },
    { id: 'f-press',   label: 'Press',           href: '#' },
    { id: 'f-blog',    label: 'Blog',            href: '#' },
  ],
  Support: [
    { id: 'f-help',    label: 'Help Centre',     href: '#' },
    { id: 'f-contact', label: 'Contact Us',      href: '#' },
    { id: 'f-faq',     label: 'FAQ',             href: '#faq' },
    { id: 'f-status',  label: 'Platform Status', href: '#' },
  ],
  Legal: [
    { id: 'f-terms',   label: 'Terms of Service', href: '#' },
    { id: 'f-privacy', label: 'Privacy Policy',   href: '#' },
    { id: 'f-cookie',  label: 'Cookie Policy',    href: '#' },
    { id: 'f-reg',     label: 'Regulatory Info',  href: '#' },
  ],
};

export default function LandingFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 pt-16 pb-8">
        {/* Top row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <AppLogo size={36} />
              <span className="font-bold text-xl tracking-tight">MTNInvest</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
  Africa&apos;s most accessible investment platform. Link your card, set your goals, and watch your wealth grow seamlessly.
</p>
            <div className="flex items-center gap-3">
              {socialLinks?.map(s => (
                <a
                  key={s?.id}
                  href="#"
                  aria-label={s?.label}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-gray-400 hover:bg-mtn-yellow hover:text-black transition-all duration-150"
                >
                  <s.IconComponent size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks)?.map(([section, links]) => (
            <div key={`footer-section-${section}`}>
              <h4 className="text-sm font-semibold text-white mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links?.map(link => (
                  <li key={link?.id}>
                    <a href={link?.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
                      {link?.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Regulatory notice */}
        <div className="border-t border-white/10 pt-6 mb-6">
          <p className="text-xs text-gray-500 leading-relaxed">
            MTNInvest is a registered investment platform operated by MTN Financial Services Nigeria Ltd. Regulated by the Central Bank of Nigeria (CBN). All deposits are covered by the Nigeria Deposit Insurance Corporation (NDIC) up to ₦5,000,000. Investment returns are not guaranteed and past performance is not indicative of future results. Capital at risk.
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 MTN Financial Services Nigeria Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/signin" className="text-sm font-semibold bg-mtn-yellow text-black px-5 py-2 rounded-xl hover:bg-mtn-yellow-dark transition-all duration-150 active:scale-95">
              Sign In to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}