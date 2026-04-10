import React from 'react';
import DashboardSidebar from './DashboardSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'investor' | 'admin';
  pageTitle: string;
  pageSubtitle?: string;
  actions?: React.ReactNode;
}

export default function DashboardLayout({ children, role, pageTitle, pageSubtitle, actions }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <DashboardSidebar role={role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-8 shrink-0">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{pageTitle}</h1>
            {pageSubtitle && <p className="text-sm text-gray-500 mt-0.5">{pageSubtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            {actions}
          </div>
        </header>
        {/* Main content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}