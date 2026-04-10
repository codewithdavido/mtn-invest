import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PortfolioKPIs from './components/PortfolioKPIs';
import PortfolioChart from './components/PortfolioChart';
import InvestmentPlans from './components/InvestmentPlans';
import TransactionHistory from './components/TransactionHistory';
import DashboardActions from './components/DashboardActions';

export default function InvestorDashboardPage() {
  return (
    <DashboardLayout
      role="investor"
      pageTitle="My Portfolio"
      pageSubtitle="Welcome back, Kwame — your money is working hard."
      actions={<DashboardActions />}
    >
      <div className="space-y-8">
        <PortfolioKPIs />
        <div className="grid xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <PortfolioChart />
          </div>
          <div className="xl:col-span-1">
            <InvestmentPlans />
          </div>
        </div>
        <TransactionHistory />
      </div>
    </DashboardLayout>
  );
}