'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard, Wallet, ArrowDownUp, TrendingUp, History,
  Settings, LogOut, ChevronLeft, ChevronRight, Bell, ShieldCheck,
  Users, BarChart3, FileText
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
}

interface SidebarProps {
  role: 'investor' | 'admin';
}

const investorNav: NavItem[] = [
  { id: 'nav-dashboard',    label: 'Dashboard',     icon: <LayoutDashboard size={20} />, href: '/investor-dashboard' },
  { id: 'nav-portfolio',    label: 'My Portfolio',  icon: <Wallet size={20} />,          href: '/investor-dashboard' },
  { id: 'nav-transactions', label: 'Transactions',  icon: <ArrowDownUp size={20} />,     href: '/investor-dashboard' },
  { id: 'nav-performance',  label: 'Performance',   icon: <TrendingUp size={20} />,      href: '/investor-dashboard' },
  { id: 'nav-history',      label: 'History',       icon: <History size={20} />,         href: '/investor-dashboard' },
];

const adminNav: NavItem[] = [
  { id: 'nav-admin-dash',   label: 'Overview',      icon: <LayoutDashboard size={20} />, href: '/admin-panel' },
  { id: 'nav-admin-users',  label: 'Users',         icon: <Users size={20} />,           href: '/admin-panel', badge: 4 },
  { id: 'nav-admin-plans',  label: 'Plans',         icon: <BarChart3 size={20} />,       href: '/admin-panel' },
  { id: 'nav-admin-txns',   label: 'Transactions',  icon: <ArrowDownUp size={20} />,     href: '/admin-panel', badge: 2 },
  { id: 'nav-admin-kyc',    label: 'KYC Reviews',   icon: <ShieldCheck size={20} />,     href: '/admin-panel', badge: 7 },
  { id: 'nav-admin-reports',label: 'Reports',       icon: <FileText size={20} />,        href: '/admin-panel' },
];

export default function DashboardSidebar({ role }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const navItems = role === 'admin' ? adminNav : investorNav;

  return (
    <aside
      className={`relative flex flex-col bg-white border-r border-gray-100 h-screen sticky top-0 transition-all duration-300 ease-in-out ${collapsed ? 'w-16' : 'w-60'} shrink-0`}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 border-b border-gray-100 px-4 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <AppLogo size={32} />
        {!collapsed && (
          <span className="font-bold text-lg text-gray-900 tracking-tight">MTNInvest</span>
        )}
      </div>

      {/* Toggle */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="absolute -right-3 top-[4.5rem] z-10 w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all duration-150 active:scale-95"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Role label */}
      {!collapsed && (
        <div className="px-4 pt-5 pb-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            {role === 'admin' ? 'Administration' : 'Investor Portal'}
          </p>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 py-1 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-mtn-yellow text-black' :'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <span className={`shrink-0 ${isActive ? 'text-black' : 'text-gray-400 group-hover:text-gray-700'}`}>
                {item.icon}
              </span>
              {!collapsed && <span className="flex-1">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="ml-auto bg-red-100 text-red-600 text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
              {collapsed && item.badge && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
              {collapsed && (
                <span className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-150 z-50">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-gray-100 px-2 py-3 space-y-0.5">
        {[
          { id: 'nav-notif',    icon: <Bell size={20} />,     label: 'Notifications', badge: 3 },
          { id: 'nav-settings', icon: <Settings size={20} />, label: 'Settings' },
        ].map(item => (
          <button
            key={item.id}
            className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-150 ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? item.label : undefined}
          >
            <span className="shrink-0 text-gray-400 group-hover:text-gray-700">{item.icon}</span>
            {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
            {!collapsed && item.badge && (
              <span className="bg-red-100 text-red-600 text-xs font-semibold px-1.5 py-0.5 rounded-full">{item.badge}</span>
            )}
            {collapsed && item.badge && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
            {collapsed && (
              <span className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-150 z-50">
                {item.label}
              </span>
            )}
          </button>
        ))}

        {/* User profile */}
        <div className={`flex items-center gap-3 px-3 py-2.5 mt-1 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-mtn-yellow flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-black">{role === 'admin' ? 'AD' : 'KO'}</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{role === 'admin' ? 'Admin User' : 'Kwame Osei'}</p>
              <p className="text-xs text-gray-400 truncate">{role === 'admin' ? 'Platform Admin' : 'Retail Investor'}</p>
            </div>
          )}
          {!collapsed && (
            <Link href="/landing-page" className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150" title="Sign out">
              <LogOut size={16} />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}