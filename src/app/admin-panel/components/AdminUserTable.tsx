'use client';
import React, { useState } from 'react';
import { Search, ChevronUp, ChevronDown, MoreVertical, Eye, Ban, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';

type KycStatus = 'verified' | 'unverified' | 'pending';
type AccountStatus = 'active' | 'suspended';

interface User {
  id: string;
  accountNo: string;
  name: string;
  phone: string;
  email: string;
  kycStatus: KycStatus;
  accountStatus: AccountStatus;
  portfolioValue: number;
  activePlans: number;
  lastTransaction: string;
  joinDate: string;
  region: string;
}

const users: User[] = [
  { id: 'usr-001', accountNo: 'MTN-INV-00841', name: 'Kwame Osei',       phone: '0244-721-330', email: 'k.osei@gmail.com',      kycStatus: 'verified',   accountStatus: 'active',    portfolioValue: 14160, activePlans: 4, lastTransaction: '07 Apr 2026', joinDate: '14 Jun 2025', region: 'Greater Accra' },
  { id: 'usr-002', accountNo: 'MTN-INV-00842', name: 'Abena Mensah',     phone: '0244-532-881', email: 'a.mensah@yahoo.com',    kycStatus: 'verified',   accountStatus: 'active',    portfolioValue: 8200,  activePlans: 2, lastTransaction: '05 Apr 2026', joinDate: '22 Jul 2025', region: 'Ashanti' },
  { id: 'usr-003', accountNo: 'MTN-INV-00843', name: 'Kofi Boateng',     phone: '0555-112-907', email: 'kofi.b@hotmail.com',    kycStatus: 'verified',   accountStatus: 'active',    portfolioValue: 23500, activePlans: 3, lastTransaction: '04 Apr 2026', joinDate: '3 Jan 2025',  region: 'Ashanti' },
  { id: 'usr-004', accountNo: 'MTN-INV-00844', name: 'Fatima Al-Hassan', phone: '0244-889-004', email: 'f.alhassan@gmail.com',  kycStatus: 'unverified', accountStatus: 'active',    portfolioValue: 1200,  activePlans: 1, lastTransaction: '01 Apr 2026', joinDate: '28 Feb 2026', region: 'Northern' },
  { id: 'usr-005', accountNo: 'MTN-INV-00845', name: 'Emmanuel Tetteh',  phone: '0277-340-215', email: 'e.tetteh@outlook.com',  kycStatus: 'verified',   accountStatus: 'active',    portfolioValue: 5800,  activePlans: 2, lastTransaction: '03 Apr 2026', joinDate: '15 Sep 2025', region: 'Greater Accra' },
  { id: 'usr-006', accountNo: 'MTN-INV-00846', name: 'Ama Darko',        phone: '0244-667-542', email: 'ama.darko@gmail.com',   kycStatus: 'pending',    accountStatus: 'active',    portfolioValue: 500,   activePlans: 1, lastTransaction: '06 Apr 2026', joinDate: '04 Apr 2026', region: 'Western' },
  { id: 'usr-007', accountNo: 'MTN-INV-00847', name: 'Yaw Asante',       phone: '0554-220-813', email: 'y.asante@gmail.com',    kycStatus: 'verified',   accountStatus: 'suspended', portfolioValue: 3100,  activePlans: 0, lastTransaction: '15 Mar 2026', joinDate: '10 Aug 2025', region: 'Brong-Ahafo' },
  { id: 'usr-008', accountNo: 'MTN-INV-00848', name: 'Akosua Frimpong',  phone: '0244-104-772', email: 'a.frimpong@yahoo.com',  kycStatus: 'verified',   accountStatus: 'active',    portfolioValue: 9800,  activePlans: 3, lastTransaction: '06 Apr 2026', joinDate: '30 Nov 2024', region: 'Eastern' },
  { id: 'usr-009', accountNo: 'MTN-INV-00849', name: 'Nana Adu',         phone: '0555-882-341', email: 'nana.adu@outlook.com',  kycStatus: 'unverified', accountStatus: 'active',    portfolioValue: 800,   activePlans: 1, lastTransaction: '02 Apr 2026', joinDate: '15 Mar 2026', region: 'Volta' },
  { id: 'usr-010', accountNo: 'MTN-INV-00850', name: 'Esi Antwi',        phone: '0244-553-990', email: 'esi.antwi@gmail.com',   kycStatus: 'verified',   accountStatus: 'active',    portfolioValue: 18400, activePlans: 5, lastTransaction: '07 Apr 2026', joinDate: '1 Oct 2024',  region: 'Greater Accra' },
];

type SortKey = keyof User;

export default function AdminUserTable() {
  const [search, setSearch] = useState('');
  const [kycFilter, setKycFilter] = useState<KycStatus | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<AccountStatus | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('portfolioValue');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const perPage = 6;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const filtered = users
    .filter(u => {
      const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.accountNo.toLowerCase().includes(search.toLowerCase()) ||
        u.phone.includes(search);
      const matchKyc = kycFilter === 'all' || u.kycStatus === kycFilter;
      const matchStatus = statusFilter === 'all' || u.accountStatus === statusFilter;
      return matchSearch && matchKyc && matchStatus;
    })
    .sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col">
      <ChevronUp size={9} className={sortKey === col && sortDir === 'asc' ? 'text-mtn-yellow-dark' : 'text-gray-300'} />
      <ChevronDown size={9} className={sortKey === col && sortDir === 'desc' ? 'text-mtn-yellow-dark' : 'text-gray-300'} />
    </span>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-gray-100">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Investor Accounts</h3>
          <p className="text-sm text-gray-400 mt-0.5">{filtered.length} investors</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search name, account, phone..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-transparent w-56 transition-all duration-150"
            />
          </div>
          <select
            value={kycFilter}
            onChange={e => { setKycFilter(e.target.value as KycStatus | 'all'); setPage(1); }}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mtn-yellow text-gray-700 bg-white"
          >
            <option value="all">All KYC</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
            <option value="pending">Pending</option>
          </select>
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value as AccountStatus | 'all'); setPage(1); }}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mtn-yellow text-gray-700 bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {[
                { key: 'accountNo' as SortKey, label: 'Account No.' },
                { key: 'name' as SortKey,      label: 'Investor Name' },
                { key: 'phone' as SortKey,     label: 'Phone' },
                { key: 'kycStatus' as SortKey, label: 'KYC' },
                { key: 'accountStatus' as SortKey, label: 'Status' },
                { key: 'portfolioValue' as SortKey, label: 'Portfolio Value' },
                { key: 'activePlans' as SortKey, label: 'Plans' },
                { key: 'region' as SortKey,    label: 'Region' },
                { key: 'lastTransaction' as SortKey, label: 'Last Txn' },
                { key: 'joinDate' as SortKey,  label: 'Joined' },
              ].map(col => (
                <th
                  key={`th-${col.key}`}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-gray-600 transition-colors duration-150 select-none"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  <SortIcon col={col.key} />
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-5 py-16 text-center">
                  <Users size={32} className="mx-auto text-gray-200 mb-3" />
                  <p className="text-sm font-semibold text-gray-400">No investors match your filters</p>
                </td>
              </tr>
            ) : (
              paginated.map((user) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors duration-100 group relative">
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-xs font-medium text-gray-500">{user.accountNo}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-mtn-yellow flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-black">{user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 whitespace-nowrap">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-xs text-gray-600">{user.phone}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant={user.kycStatus as 'verified' | 'unverified' | 'pending'} />
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant={user.accountStatus} />
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-bold tabular-nums text-gray-900">GH₵ {user.portfolioValue.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-sm font-semibold ${user.activePlans === 0 ? 'text-gray-300' : 'text-gray-700'}`}>{user.activePlans}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-gray-500 whitespace-nowrap">{user.region}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-gray-500 whitespace-nowrap">{user.lastTransaction}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-gray-400 whitespace-nowrap">{user.joinDate}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      <button
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-150"
                        title="View investor profile"
                      >
                        <Eye size={14} />
                      </button>
                      {user.accountStatus === 'active' ? (
                        <button
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
                          title="Suspend account"
                        >
                          <Ban size={14} />
                        </button>
                      ) : (
                        <button
                          className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-150"
                          title="Reactivate account"
                        >
                          <CheckCircle2 size={14} />
                        </button>
                      )}
                      <div className="relative">
                        <button
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-150"
                          title="More actions"
                          onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                        >
                          <MoreVertical size={14} />
                        </button>
                        {openMenu === user.id && (
                          <div className="absolute right-0 top-8 bg-white border border-gray-100 rounded-xl shadow-card-hover z-20 py-1 w-44 animate-scale-in">
                            {[
                              { id: `menu-view-${user.id}`,   label: 'View Profile',       icon: <Eye size={13} /> },
                              { id: `menu-txns-${user.id}`,   label: 'View Transactions',  icon: <ChevronRight size={13} /> },
                              { id: `menu-reset-${user.id}`,  label: 'Reset Password',     icon: <CheckCircle2 size={13} /> },
                            ].map(item => (
                              <button
                                key={item.id}
                                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-100"
                                onClick={() => setOpenMenu(null)}
                              >
                                <span className="text-gray-400">{item.icon}</span>
                                {item.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Showing {Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} of {filtered.length} investors
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={`admin-page-${i + 1}`}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all duration-150 ${page === i + 1 ? 'bg-mtn-yellow text-black' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}