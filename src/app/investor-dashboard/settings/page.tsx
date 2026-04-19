'use client';

import React, { useState } from 'react';
import {
  User,
  Lock,
  Banknote,
  CreditCard,
  Trash2,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Plus,
  Save,
  AlertTriangle,
} from 'lucide-react';

type SectionId = 'profile' | 'security' | 'bank' | 'card' | 'danger';

const sections = [
  { id: 'profile'  as SectionId, label: 'Profile',      icon: User       },
  { id: 'security' as SectionId, label: 'Security',     icon: Lock       },
  { id: 'bank'     as SectionId, label: 'Bank Account', icon: Banknote   },
  { id: 'card'     as SectionId, label: 'Linked Card',  icon: CreditCard },
  { id: 'danger'   as SectionId, label: 'Danger Zone',  icon: Trash2     },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SectionId>('profile');

  // Profile state
  const [profile, setProfile] = useState({
    fullName: 'Chioma Okafor',
    email: 'chioma@email.com',
    phone: '08012345678',
  });
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);

  // Security state
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [securitySuccess, setSecuritySuccess] = useState('');
  const [securityError, setSecurityError] = useState('');
  const [securityLoading, setSecurityLoading] = useState(false);

  // Bank state
  const [hasBank, setHasBank] = useState(true);
  const [bank] = useState({ bankName: 'GTBank', accountNumber: '0123456789', accountName: 'Chioma Okafor' });
  const [bankSuccess, setBankSuccess] = useState('');

  // Card state
  const [hasCard, setHasCard] = useState(true);
  const [cardSuccess, setCardSuccess] = useState('');

  // Danger zone state
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleProfileSave = async () => {
    setProfileLoading(true);
    await new Promise(res => setTimeout(res, 1200));
    setProfileSuccess('Profile updated successfully!');
    setProfileLoading(false);
    setTimeout(() => setProfileSuccess(''), 3000);
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
    setSecuritySuccess('Password changed successfully!');
    setPasswords({ current: '', newPass: '', confirm: '' });
    setSecurityLoading(false);
    setTimeout(() => setSecuritySuccess(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500 mt-1 text-sm">Manage your account details and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Sidebar nav */}
        <div className="lg:w-56 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-200 p-2 space-y-1">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                aria-label={`Go to ${section.label}`}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                  activeSection === section.id
                    ? section.id === 'danger'
                      ? 'bg-red-50 text-red-600'
                      : 'bg-mtn-yellow text-black'
                    : section.id === 'danger'
                      ? 'text-red-500 hover:bg-red-50'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <section.icon size={16} className="shrink-0" />
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">

          {/* ── Profile ── */}
          {activeSection === 'profile' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <User size={18} className="text-mtn-yellow-dark" />
                Profile Information
              </h3>

              {profileSuccess && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700">
                  <CheckCircle size={16} className="shrink-0" />
                  {profileSuccess}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    title="Full name"
                    value={profile.fullName}
                    onChange={e => setProfile({ ...profile, fullName: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    title="Email address"
                    value={profile.email}
                    onChange={e => setProfile({ ...profile, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    title="Phone number"
                    value={profile.phone}
                    onChange={e => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="080XXXXXXXX"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
                  />
                </div>
              </div>

              <button
                onClick={handleProfileSave}
                disabled={profileLoading}
                aria-label="Save profile changes"
                className="flex items-center gap-2 px-6 py-3 bg-mtn-yellow text-black text-sm font-bold rounded-xl hover:bg-mtn-yellow-dark transition-all duration-150 disabled:opacity-60"
              >
                <Save size={15} />
                {profileLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {/* ── Security ── */}
          {activeSection === 'security' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Lock size={18} className="text-mtn-yellow-dark" />
                Change Password
              </h3>

              {securitySuccess && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700">
                  <CheckCircle size={16} className="shrink-0" />
                  {securitySuccess}
                </div>
              )}

              {securityError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  <AlertCircle size={16} className="shrink-0" />
                  {securityError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      id="currentPassword"
                      type={showCurrent ? 'text' : 'password'}
                      title="Current password"
                      value={passwords.current}
                      onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
                    />
                    <button
                      type="button"
                      aria-label={showCurrent ? 'Hide current password' : 'Show current password'}
                      onClick={() => setShowCurrent(p => !p)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-700"
                    >
                      {showCurrent ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showNew ? 'text' : 'password'}
                      title="New password"
                      value={passwords.newPass}
                      onChange={e => setPasswords({ ...passwords, newPass: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
                    />
                    <button
                      type="button"
                      aria-label={showNew ? 'Hide new password' : 'Show new password'}
                      onClick={() => setShowNew(p => !p)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-700"
                    >
                      {showNew ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirm ? 'text' : 'password'}
                      title="Confirm new password"
                      value={passwords.confirm}
                      onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
                    />
                    <button
                      type="button"
                      aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                      onClick={() => setShowConfirm(p => !p)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-700"
                    >
                      {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePasswordChange}
                disabled={securityLoading}
                aria-label="Update password"
                className="flex items-center gap-2 px-6 py-3 bg-mtn-yellow text-black text-sm font-bold rounded-xl hover:bg-mtn-yellow-dark transition-all duration-150 disabled:opacity-60"
              >
                <Lock size={15} />
                {securityLoading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          )}

          {/* ── Bank Account ── */}
          {activeSection === 'bank' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Banknote size={18} className="text-mtn-yellow-dark" />
                Bank Account
              </h3>

              {bankSuccess && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700">
                  <CheckCircle size={16} className="shrink-0" />
                  {bankSuccess}
                </div>
              )}

              {hasBank ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center shrink-0">
                        <span className="text-mtn-yellow text-xs font-bold">GTB</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{bank.bankName}</p>
                        <p className="text-xs text-gray-400">{bank.accountNumber}</p>
                        <p className="text-xs text-gray-400">{bank.accountName}</p>
                      </div>
                    </div>
                    <button
                      aria-label="Remove bank account"
                      onClick={() => { setHasBank(false); setBankSuccess(''); }}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-150"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    To change your bank account, remove the current one and add a new one.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Bank Name
                    </label>
                    <input
                      id="bankName"
                      type="text"
                      title="Bank name"
                      placeholder="e.g. GTBank"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
                    />
                  </div>
                  <div>
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Account Number
                    </label>
                    <input
                      id="accountNumber"
                      type="text"
                      title="Account number"
                      placeholder="10-digit account number"
                      maxLength={10}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
                    />
                  </div>
                  <div>
                    <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Account Name
                    </label>
                    <input
                      id="accountName"
                      type="text"
                      title="Account name auto-fetched"
                      placeholder="Auto-fetched after account number"
                      disabled
                      className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm text-gray-400 cursor-not-allowed"
                    />
                  </div>
                  <button
                    aria-label="Add bank account"
                    onClick={() => {
                      setHasBank(true);
                      setBankSuccess('Bank account added successfully!');
                      setTimeout(() => setBankSuccess(''), 3000);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-mtn-yellow text-black text-sm font-bold rounded-xl hover:bg-mtn-yellow-dark transition-all duration-150"
                  >
                    <Plus size={15} />
                    Add Bank Account
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Linked Card ── */}
          {activeSection === 'card' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <CreditCard size={18} className="text-mtn-yellow-dark" />
                Linked Card
              </h3>

              {cardSuccess && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700">
                  <CheckCircle size={16} className="shrink-0" />
                  {cardSuccess}
                </div>
              )}

              {hasCard ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                        <span className="text-mtn-yellow text-xs font-bold">Visa</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">•••• •••• •••• 4242</p>
                        <p className="text-xs text-gray-400">Chioma Okafor · Expires 12/27</p>
                      </div>
                    </div>
                    <button
                      aria-label="Remove linked card"
                      onClick={() => { setHasCard(false); setCardSuccess(''); }}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-150"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Your card details are stored securely via Paystack. We never store your full card number.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    aria-label="Link a new card via Paystack"
                    onClick={() => {
                      setHasCard(true);
                      setCardSuccess('Card linked successfully!');
                      setTimeout(() => setCardSuccess(''), 3000);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:border-mtn-yellow hover:text-mtn-yellow-dark transition-all duration-150"
                  >
                    <Plus size={18} />
                    Link a New Card via Paystack
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    You'll be redirected to Paystack's secure card vault to link your card.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── Danger Zone ── */}
          {activeSection === 'danger' && (
            <div className="bg-white rounded-2xl border border-red-200 p-6 space-y-5">
              <h3 className="text-base font-bold text-red-600 flex items-center gap-2">
                <AlertTriangle size={18} />
                Danger Zone
              </h3>

              <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                <p className="text-sm font-semibold text-red-700 mb-1">Delete Account</p>
                <p className="text-xs text-red-500 leading-relaxed">
                  Once you delete your account, there is no going back. All your data will be permanently removed.
                  Any pending returns will be forfeited. Please be absolutely sure before proceeding.
                </p>
              </div>

              {!showDeleteModal ? (
                <button
                  aria-label="Delete my account"
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 transition-all duration-150"
                >
                  <Trash2 size={15} />
                  Delete My Account
                </button>
              ) : (
                <div className="space-y-4 border border-red-200 rounded-xl p-4 bg-red-50">
                  <p className="text-sm font-semibold text-red-700">
                    Type <span className="font-black">DELETE</span> to confirm
                  </p>
                  <div>
                    <label htmlFor="deleteConfirm" className="sr-only">
                      Type DELETE to confirm account deletion
                    </label>
                    <input
                      id="deleteConfirm"
                      type="text"
                      title="Type DELETE to confirm account deletion"
                      value={deleteConfirm}
                      onChange={e => setDeleteConfirm(e.target.value)}
                      placeholder="Type DELETE"
                      className="w-full px-4 py-3 border border-red-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      aria-label="Cancel account deletion"
                      onClick={() => { setShowDeleteModal(false); setDeleteConfirm(''); }}
                      className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-150"
                    >
                      Cancel
                    </button>
                    <button
                      aria-label="Confirm account deletion"
                      disabled={deleteConfirm !== 'DELETE'}
                      className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Confirm Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}