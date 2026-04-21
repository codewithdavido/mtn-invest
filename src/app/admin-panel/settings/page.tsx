'use client';

import React, { useState } from 'react';
import {
  Settings,
  Save,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Shield,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function AdminSettingsPage() {

  // Platform settings
  const [sharePrice, setSharePrice] = useState('8900');
  const [minShares, setMinShares] = useState('4');
  const [minDeposit, setMinDeposit] = useState('10000');
  const [minWithdrawal, setMinWithdrawal] = useState('17800');
  const [platformSuccess, setPlatformSuccess] = useState('');
  const [platformLoading, setPlatformLoading] = useState(false);

  // Security settings
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [securitySuccess, setSecuritySuccess] = useState('');
  const [securityError, setSecurityError] = useState('');
  const [securityLoading, setSecurityLoading] = useState(false);

  // Reset modal
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetConfirm, setResetConfirm] = useState('');

  const handlePlatformSave = async () => {
    setPlatformLoading(true);
    await new Promise(res => setTimeout(res, 1200));
    setPlatformSuccess('Platform settings updated successfully!');
    setPlatformLoading(false);
    setTimeout(() => setPlatformSuccess(''), 3000);
  };

  const handlePasswordChange = async () => {
    setSecurityError('');
    setSecuritySuccess('');
    if (!passwords.current) { setSecurityError('Current password is required'); return; }
    if (!passwords.newPass) { setSecurityError('New password is required'); return; }
    if (passwords.newPass.length < 8) { setSecurityError('Password must be at least 8 characters'); return; }
    if (passwords.newPass !== passwords.confirm) { setSecurityError('Passwords do not match'); return; }
    setSecurityLoading(true);
    await new Promise(res => setTimeout(res, 1200));
    setSecuritySuccess('Admin password changed successfully!');
    setPasswords({ current: '', newPass: '', confirm: '' });
    setSecurityLoading(false);
    setTimeout(() => setSecuritySuccess(''), 3000);
  };

  const monthlyReturn = sharePrice && minShares
    ? (parseFloat(sharePrice.replace(/,/g, '')) * parseInt(minShares) * 0.5).toLocaleString('en-NG')
    : '0';

  return (
    <div className="space-y-6 max-w-3xl">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500 mt-1 text-sm">Manage platform configuration and admin security</p>
      </div>

      {/* ── Platform Settings ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Settings size={18} className="text-mtn-yellow-dark" />
          Platform Settings
        </h3>

        {platformSuccess && (
          <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700">
            <CheckCircle size={16} className="shrink-0" />
            {platformSuccess}
          </div>
        )}

        {/* Live preview */}
        <div className="bg-gray-950 rounded-xl p-4 text-white">
          <p className="text-xs text-gray-400 mb-3 uppercase tracking-widest font-semibold">Live Preview</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Share Price',      value: `₦${parseInt(sharePrice || '0').toLocaleString()}` },
              { label: 'Min Shares',       value: `${minShares || '0'} shares`                       },
              { label: 'Min Investment',   value: `₦${(parseInt(sharePrice || '0') * parseInt(minShares || '0')).toLocaleString()}` },
              { label: 'Min Monthly Return', value: `₦${monthlyReturn}`                               },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                <p className="text-sm font-bold text-mtn-yellow">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sharePrice" className="block text-sm font-medium text-gray-700 mb-1.5">
              Share Price (₦)
            </label>
            <input
              id="sharePrice"
              type="text"
              title="Share price in naira"
              value={sharePrice}
              onChange={e => setSharePrice(e.target.value.replace(/[^0-9]/g, ''))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
            />
            <p className="text-xs text-gray-400 mt-1">Current: ₦8,900 per share</p>
          </div>
          <div>
            <label htmlFor="minShares" className="block text-sm font-medium text-gray-700 mb-1.5">
              Minimum Shares
            </label>
            <input
              id="minShares"
              type="text"
              title="Minimum number of shares"
              value={minShares}
              onChange={e => setMinShares(e.target.value.replace(/[^0-9]/g, ''))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
            />
            <p className="text-xs text-gray-400 mt-1">Current: 4 shares minimum</p>
          </div>
          <div>
            <label htmlFor="minDeposit" className="block text-sm font-medium text-gray-700 mb-1.5">
              Minimum Deposit (₦)
            </label>
            <input
              id="minDeposit"
              type="text"
              title="Minimum deposit amount"
              value={minDeposit}
              onChange={e => setMinDeposit(e.target.value.replace(/[^0-9]/g, ''))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
            />
            <p className="text-xs text-gray-400 mt-1">Current: ₦10,000 minimum</p>
          </div>
          <div>
            <label htmlFor="minWithdrawal" className="block text-sm font-medium text-gray-700 mb-1.5">
              Minimum Withdrawal (₦)
            </label>
            <input
              id="minWithdrawal"
              type="text"
              title="Minimum withdrawal amount"
              value={minWithdrawal}
              onChange={e => setMinWithdrawal(e.target.value.replace(/[^0-9]/g, ''))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
            />
            <p className="text-xs text-gray-400 mt-1">Current: ₦17,800 minimum</p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-xl p-4">
          <AlertTriangle size={16} className="text-orange-500 shrink-0 mt-0.5" />
          <p className="text-xs text-orange-700">
            Changing platform settings affects all future investments and withdrawals. Existing investments are not affected. Changes take effect immediately.
          </p>
        </div>

        <button
          onClick={handlePlatformSave}
          disabled={platformLoading}
          aria-label="Save platform settings"
          className="flex items-center gap-2 px-6 py-3 bg-mtn-yellow text-black text-sm font-bold rounded-xl hover:bg-mtn-yellow-dark transition-all duration-150 disabled:opacity-60"
        >
          <Save size={15} />
          {platformLoading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* ── Security Settings ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Shield size={18} className="text-mtn-yellow-dark" />
          Admin Security
        </h3>

        {securitySuccess && (
          <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700">
            <CheckCircle size={16} className="shrink-0" />
            {securitySuccess}
          </div>
        )}

        {securityError && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            <AlertTriangle size={16} className="shrink-0" />
            {securityError}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
            <div className="relative">
              <input
                id="currentPassword"
                type={showCurrent ? 'text' : 'password'}
                title="Current admin password"
                value={passwords.current}
                onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
              />
              <button type="button" aria-label={showCurrent ? 'Hide password' : 'Show password'} onClick={() => setShowCurrent(p => !p)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-700">
                {showCurrent ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNew ? 'text' : 'password'}
                title="New admin password"
                value={passwords.newPass}
                onChange={e => setPasswords({ ...passwords, newPass: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
              />
              <button type="button" aria-label={showNew ? 'Hide password' : 'Show password'} onClick={() => setShowNew(p => !p)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-700">
                {showNew ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                title="Confirm new admin password"
                value={passwords.confirm}
                onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
              />
              <button type="button" aria-label={showConfirm ? 'Hide password' : 'Show password'} onClick={() => setShowConfirm(p => !p)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-700">
                {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handlePasswordChange}
          disabled={securityLoading}
          aria-label="Update admin password"
          className="flex items-center gap-2 px-6 py-3 bg-mtn-yellow text-black text-sm font-bold rounded-xl hover:bg-mtn-yellow-dark transition-all duration-150 disabled:opacity-60"
        >
          <Lock size={15} />
          {securityLoading ? 'Updating...' : 'Update Password'}
        </button>
      </div>

      {/* ── Danger Zone ── */}
      <div className="bg-white rounded-2xl border border-red-200 p-6 space-y-5">
        <h3 className="text-base font-bold text-red-600 flex items-center gap-2">
          <AlertTriangle size={18} />
          Danger Zone
        </h3>

        <div className="p-4 bg-red-50 rounded-xl border border-red-100">
          <p className="text-sm font-semibold text-red-700 mb-1">Reset All Platform Data</p>
          <p className="text-xs text-red-500 leading-relaxed">
            This will permanently delete all investor data, transactions, and investment plans. This action is irreversible. Only use this in a development/testing environment.
          </p>
        </div>

        {!showResetModal ? (
          <button
            aria-label="Reset all platform data"
            onClick={() => setShowResetModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 transition-all duration-150"
          >
            <RefreshCw size={15} />
            Reset All Data
          </button>
        ) : (
          <div className="space-y-4 border border-red-200 rounded-xl p-4 bg-red-50">
            <p className="text-sm font-semibold text-red-700">Type <span className="font-black">RESET</span> to confirm</p>
            <div>
              <label htmlFor="resetConfirm" className="sr-only">Type RESET to confirm</label>
              <input
                id="resetConfirm"
                type="text"
                title="Type RESET to confirm data reset"
                value={resetConfirm}
                onChange={e => setResetConfirm(e.target.value)}
                placeholder="Type RESET"
                className="w-full px-4 py-3 border border-red-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
              />
            </div>
            <div className="flex gap-3">
              <button
                aria-label="Cancel reset"
                onClick={() => { setShowResetModal(false); setResetConfirm(''); }}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-150"
              >
                Cancel
              </button>
              <button
                aria-label="Confirm data reset"
                disabled={resetConfirm !== 'RESET'}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}