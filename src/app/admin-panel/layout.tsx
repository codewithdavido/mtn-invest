'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  CircleDollarSign,
  ArrowDownLeft,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
  Shield,
} from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard',    label: 'Dashboard',         icon: LayoutDashboard,  href: '/admin-panel'                        },
  { id: 'investors',    label: 'Investors',          icon: Users,            href: '/admin-panel/investors'              },
  { id: 'plans',        label: 'Investment Plans',   icon: TrendingUp,       href: '/admin-panel/investment-plans'       },
  { id: 'returns',      label: 'Monthly Returns',    icon: CircleDollarSign, href: '/admin-panel/monthly-returns'        },
  { id: 'withdrawals',  label: 'Withdrawals',        icon: ArrowDownLeft,    href: '/admin-panel/withdrawals'            },
  { id: 'transactions', label: 'Transactions',       icon: History,          href: '/admin-panel/transactions'           },
  { id: 'settings',     label: 'Settings',           icon: Settings,         href: '/admin-panel/settings'               },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    router.push('/admin/login');
  };

  const currentPage = navItems.find(item => item.href === pathname)?.label ?? 'Admin Panel';

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 min-h-screen h-full w-64 bg-gray-950 z-30 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:sticky md:top-0 md:self-start md:h-screen
      `}>

        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
          <Link href="/admin-panel" className="flex items-center gap-2.5">
            <AppLogo size={32} />
            <div>
              <span className="font-bold text-base text-white tracking-tight block">MTNInvest</span>
              <span className="text-xs text-mtn-yellow font-semibold">Admin Panel</span>
            </div>
          </Link>
          <button
            aria-label="Close sidebar"
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Admin badge */}
        <div className="px-6 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shrink-0">
              <Shield size={18} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">Administrator</p>
              <p className="text-xs text-gray-400 truncate">admin@mtninvest.com</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-150
                  ${isActive
                    ? 'bg-mtn-yellow text-black'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <item.icon size={18} className="shrink-0" />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight size={14} className="shrink-0" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10 shrink-0">
          <button
            onClick={handleLogout}
            aria-label="Logout"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150"
          >
            <LogOut size={18} className="shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">

        {/* Top header */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
          {/* Mobile menu button */}
          <button
            aria-label="Open sidebar"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          {/* Page title */}
          <div className="hidden md:flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <h1 className="text-lg font-bold text-gray-900">{currentPage}</h1>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Admin badge */}
            <div className="hidden sm:flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2 rounded-xl">
              <Shield size={14} className="text-red-500" />
              <span className="text-sm font-bold text-red-600">Admin</span>
            </div>

            {/* Notifications */}
            <button
              aria-label="Notifications"
              className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-all duration-150"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center shrink-0">
              <Shield size={16} className="text-white" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}