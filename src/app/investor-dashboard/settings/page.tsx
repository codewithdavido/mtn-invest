'use client';

import React, { useState, useEffect } from 'react';
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
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import {
  getUserProfile,
  updateProfile,
  changePassword,
  saveBankAccount,
  removeBankAccount,
  deleteAccount,
} from '@/lib/auth';

type SectionId = 'profile' | 'security' | 'bank' | 'card' | 'danger';

const sections = [
  { id: 'profile'  as SectionId, label: 'Profile',      icon: User       },
  { id: 'security' as SectionId, label: 'Security',     icon: Lock       },
  { id: 'bank'     as SectionId, label: 'Bank Account', icon: Banknote   },
  { id: 'card'     as SectionId, label: 'Linked Card',  icon: CreditCard },
  { id: 'danger'   as SectionId, label: 'Danger Zone',  icon: Trash2     },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<SectionId>('profile');

  // Profile state
  const [profile, setProfile] = useState({ fullName: '', email: '', phone: '' });
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
  const [hasBank, setHasBank] = useState(false);
  const [bank, setBank] = useState({ bankName: '', accountNumber: '', accountName: '' });
  const [newBank, setNewBank] = useState({ bankName: '', accountNumber: '', accountName: '' });
  const [bankSuccess, setBankSuccess] = useState('');
  const [bankError, setBankError] = useState('');
  const [bankLoading, setBankLoading] = useState(false);

  // Card state
  const [hasCard, setHasCard] = useState(true);
  const [cardSuccess, setCardSuccess] = useState('');

  // Danger zone state
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // Load real user profile
  useEffect(() => {
    if (user) {
      getUserProfile(user.uid).then((data) => {
        if (data) {
          setProfile({
            fullName: data.fullName || '',
            email: data.email || user.email || '',
            phone: data.phone || '',
          });
          if (data.bankAccount) {
            setBank(data.bankAccount);
            setHasBank(true);
          }
        }
      });
    }
  }, [user]);

  const handleProfileSave = async () => {
    if (!user) return;
    setProfileLoading(true);
    try {
      await updateProfile(user.uid, {
        fullName: profile.fullName,
        phone: profile.phone,
      });
      setProfileSuccess('Profile updated successfully!');
      setTimeout(() => setProfileSuccess(''), 3000);
    } catch {
      setProfileSuccess('');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    setSecurityError('');
    setSecuritySuccess('');
    if (!passwords.current) { setSecurityError('Current password is required'); return; }
    if (!passwords.newPass) { setSecurityError('New password is required'); return; }
    if (passwords.newPass.length < 8) { setSecurityError('Password must be at least 8 characters'); return; }
    if (passwords.newPass !== passwords.confirm) { setSecurityError('Passwords do not match'); return; }

    setSecurityLoading(true);
    try {
      await changePassword(passwords.current, passwords.newPass);
      setSecuritySuccess('Password changed successfully!');
      setPasswords({ current: '', newPass: '', confirm: '' });
      setTimeout(() => setSecuritySuccess(''), 3000);
    } catch (error: any) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setSecurityError('Current password is incorrect');
      } else {
        setSecurityError('Failed to change password. Please try again.');
      }
    } finally {
      setSecurityLoading(false);
    }
  };

  const handleSaveBank = async () => {
    if (!user) return;
    setBankError('');
    if (!newBank.bankName) { setBankError('Bank name is required'); return; }
    if (!newBank.accountNumber || newBank.accountNumber.length !== 10) { setBankError('Enter a valid 10-digit account number'); return; }
    if (!newBank.accountName) { setBankError('Account name is required'); return; }

    setBankLoading(true);
    try {
      await saveBankAccount(user.uid, newBank);
      setBank(newBank);
      setHasBank(true);
      setBankSuccess('Bank account added successfully!');
      setTimeout(() => setBankSuccess(''), 3000);
    } catch {
      setBankError('Failed to save bank account. Please try again.');
    } finally {
      setBankLoading(false);
    }
  };

  const handleRemoveBank = async () => {
    if (!user) return;
    try {
      await removeBankAccount(user.uid);
      setHasBank(false);
      setBank({ bankName: '', accountNumber: '', accountName: '' });
      setNewBank({ bankName: '', accountNumber: '', accountName: '' });
    } catch {
      // silently fail
    }
  };

  const handleDeleteAccount = async () => {
    if (!user || deleteConfirm !== 'DELETE') return;
    setDeleteLoading(true);
    setDeleteError('');
    try {
      await deleteAccount(user.uid);
      router.push('/');
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        setDeleteError('Please sign out and sign back in before deleting your account.');
      } else {
        setDeleteError('Failed to delete account. Please try again.');
      }
    } finally {
      setDeleteLoading(false);
    }
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
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={e => setProfile({ ...profile, fullName: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm text-gray-400 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
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
                {[
                  { label: 'Current Password', key: 'current', show: showCurrent, toggle: () => setShowCurrent(p => !p) },
                  { label: 'New Password',      key: 'newPass', show: showNew,     toggle: () => setShowNew(p => !p)     },
                  { label: 'Confirm New Password', key: 'confirm', show: showConfirm, toggle: () => setShowConfirm(p => !p) },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                    <div className="relative">
                      <input
                        type={field.show ? 'text' : 'password'}
                        value={passwords[field.key as keyof typeof passwords]}
                        onChange={e => setPasswords({ ...passwords, [field.key]: e.target.value })}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
                      />
                      <button
                        type="button"
                        onClick={field.toggle}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-700"
                      >
                        {field.show ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handlePasswordChange}
                disabled={securityLoading}
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

              {bankError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  <AlertCircle size={16} className="shrink-0" />
                  {bankError}
                </div>
              )}

              {hasBank ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center shrink-0">
                        <span className="text-mtn-yellow text-xs font-bold">
                          {bank.bankName.substring(0, 3).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{bank.bankName}</p>
                        <p className="text-xs text-gray-400">{bank.accountNumber}</p>
                        <p className="text-xs text-gray-400">{bank.accountName}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveBank}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Bank Name</label>
                    <input
                      type="text"
                      value={newBank.bankName}
                      onChange={e => setNewBank({ ...newBank, bankName: e.target.value })}
                      placeholder="e.g. GTBank"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Account Number</label>
                    <input
                      type="text"
                      value={newBank.accountNumber}
                      onChange={e => setNewBank({ ...newBank, accountNumber: e.target.value.replace(/[^0-9]/g, '').slice(0, 10) })}
                      placeholder="10-digit account number"
                      maxLength={10}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Account Name</label>
                    <input
                      type="text"
                      value={newBank.accountName}
                      onChange={e => setNewBank({ ...newBank, accountName: e.target.value })}
                      placeholder="Account holder name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
                    />
                  </div>
                  <button
                    onClick={handleSaveBank}
                    disabled={bankLoading}
                    className="flex items-center gap-2 px-6 py-3 bg-mtn-yellow text-black text-sm font-bold rounded-xl hover:bg-mtn-yellow-dark transition-all duration-150 disabled:opacity-60"
                  >
                    <Plus size={15} />
                    {bankLoading ? 'Saving...' : 'Add Bank Account'}
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
                        <p className="text-xs text-gray-400">Expires 12/27</p>
                      </div>
                    </div>
                    <button
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

              {deleteError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  <AlertCircle size={16} className="shrink-0" />
                  {deleteError}
                </div>
              )}

              {!showDeleteModal ? (
                <button
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
                  <input
                    type="text"
                    value={deleteConfirm}
                    onChange={e => setDeleteConfirm(e.target.value)}
                    placeholder="Type DELETE"
                    className="w-full px-4 py-3 border border-red-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setShowDeleteModal(false); setDeleteConfirm(''); }}
                      className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-150"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      disabled={deleteConfirm !== 'DELETE' || deleteLoading}
                      className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {deleteLoading ? 'Deleting...' : 'Confirm Delete'}
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