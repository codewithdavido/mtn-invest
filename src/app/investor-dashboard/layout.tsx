"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  ArrowDownLeft,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
} from "lucide-react";
import AppLogo from "@/components/ui/AppLogo";
import { useAuth } from "@/context/AuthContext";
import { logOut, getUserProfile } from "@/lib/auth";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: LayoutDashboard,
    href: "/investor-dashboard",
  },
  {
    id: "invest",
    label: "Invest",
    icon: TrendingUp,
    href: "/investor-dashboard/invest",
  },
  {
    id: "deposit",
    label: "Deposit",
    icon: Wallet,
    href: "/investor-dashboard/deposit",
  },
  {
    id: "withdraw",
    label: "Withdraw",
    icon: ArrowDownLeft,
    href: "/investor-dashboard/withdraw",
  },
  {
    id: "history",
    label: "Investment History",
    icon: History,
    href: "/investor-dashboard/history",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/investor-dashboard/settings",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);

  // Fetch user profile from database
  useEffect(() => {
    if (user) {
      getUserProfile(user.uid).then((profile) => {
        setUserProfile(profile);
      });
    }
  }, [user]);

  // Protect the dashboard — redirect to signin if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  // Show nothing while Firebase checks the session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-mtn-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not logged in
  if (!user) return null;

  const handleLogout = async () => {
    await logOut();
    router.push('/');
  };

  // Get initials from full name
  const initials = userProfile?.fullName
    ? userProfile.fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : '??';

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
      <aside
        className={`
        fixed top-0 left-0 min-h-screen h-full w-64 bg-gray-900 z-30 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:sticky md:top-0 md:self-start md:h-screen
      `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
          <Link href="/" className="flex items-center gap-2.5">
            <AppLogo size={32} />
            <span className="font-bold text-lg text-white tracking-tight">
              MTNInvest
            </span>
          </Link>
          <button
            aria-label="Close sidebar"
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* User info */}
        <div className="px-6 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-mtn-yellow flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-black">{initials}</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {userProfile?.fullName ?? 'Loading...'}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user.email}
              </p>
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
                  ${
                    isActive
                      ? "bg-mtn-yellow text-black"
                      : "text-gray-400 hover:bg-white/10 hover:text-white"
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
          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-gray-900">
              {navItems.find((item) => item.href === pathname)?.label ??
                "Dashboard"}
            </h1>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Wallet balance */}
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl">
              <Wallet size={15} className="text-mtn-yellow-dark" />
              <span className="text-sm font-bold text-gray-900">
                ₦{userProfile?.walletBalance?.toLocaleString('en-NG') ?? '0'}
              </span>
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
            <div className="w-9 h-9 rounded-full bg-mtn-yellow flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-black">{initials}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}