'use client';
import React, { useState } from 'react';
import { PlusCircle, ArrowUpRight, RefreshCw, Bell } from 'lucide-react';
import Modal from '../../../components/ui/Modal';
import DepositWithdrawForm from './DepositWithdrawForm';

export default function DashboardActions() {
  const [modalType, setModalType] = useState<'deposit' | 'withdraw' | null>(null);

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setModalType('deposit')}
          className="inline-flex items-center gap-2 bg-mtn-yellow text-black text-sm font-semibold px-4 py-2 rounded-xl hover:bg-mtn-yellow-dark transition-all duration-150 active:scale-95"
        >
          <PlusCircle size={16} />
          Deposit
        </button>
        <button
          onClick={() => setModalType('withdraw')}
          className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-50 transition-all duration-150 active:scale-95"
        >
          <ArrowUpRight size={16} />
          Withdraw
        </button>
        <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-all duration-150 active:scale-95" title="Refresh data">
          <RefreshCw size={16} />
        </button>
        <button className="relative p-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-all duration-150 active:scale-95" title="Notifications">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>

      <Modal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        title={modalType === 'deposit' ? 'Make a Deposit' : 'Request Withdrawal'}
        size="md"
      >
        {modalType && (
          <DepositWithdrawForm type={modalType} onClose={() => setModalType(null)} />
        )}
      </Modal>
    </>
  );
}