import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import AdminKPIs from './components/AdminKPIs';
import AdminUserTable from './components/AdminUserTable';
import PlanRateConfig from './components/PlanRateConfig';
import KycQueue from './components/KycQueue';
import AdminTransactionMonitor from './components/AdminTransactionMonitor';

export default function AdminPanelPage() {
  return (
    <DashboardLayout
      role="admin"
      pageTitle="Platform Overview"
      pageSubtitle="MTNInvest Admin — 7 April 2026, 20:27 WAT"
    >
      <div className="space-y-8">
        <AdminKPIs />
        <div className="grid xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <AdminUserTable />
          </div>
          <div className="xl:col-span-1 space-y-6">
            <KycQueue />
            <PlanRateConfig />
          </div>
        </div>
        <AdminTransactionMonitor />
      </div>
    </DashboardLayout>
  );
}