'use client';
import React, { useState } from 'react';
import { ShieldCheck, ShieldX, Clock, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface KycItem {
  id: string;
  accountNo: string;
  name: string;
  phone: string;
  submittedDate: string;
  docType: string;
  daysWaiting: number;
}

const kycQueue: KycItem[] = [
  { id: 'kyc-001', accountNo: 'MTN-INV-00844', name: 'Fatima Al-Hassan', phone: '0244-889-004', submittedDate: '04 Apr 2026', docType: 'Ghana Card',    daysWaiting: 3 },
  { id: 'kyc-002', accountNo: 'MTN-INV-00846', name: 'Ama Darko',        phone: '0244-667-542', submittedDate: '05 Apr 2026', docType: 'Passport',      daysWaiting: 2 },
  { id: 'kyc-003', accountNo: 'MTN-INV-00849', name: 'Nana Adu',         phone: '0555-882-341', submittedDate: '06 Apr 2026', docType: 'Voter ID',      daysWaiting: 1 },
  { id: 'kyc-004', accountNo: 'MTN-INV-00851', name: 'Efua Owusu',       phone: '0244-312-550', submittedDate: '06 Apr 2026', docType: 'Ghana Card',    daysWaiting: 1 },
  { id: 'kyc-005', accountNo: 'MTN-INV-00852', name: 'Kwesi Agyeman',    phone: '0277-440-901', submittedDate: '07 Apr 2026', docType: 'Driver\'s Licence', daysWaiting: 0 },
  { id: 'kyc-006', accountNo: 'MTN-INV-00853', name: 'Adwoa Asiedu',     phone: '0555-670-234', submittedDate: '07 Apr 2026', docType: 'Ghana Card',    daysWaiting: 0 },
  { id: 'kyc-007', accountNo: 'MTN-INV-00854', name: 'Fiifi Mensah',     phone: '0244-198-773', submittedDate: '07 Apr 2026', docType: 'Passport',      daysWaiting: 0 },
];

export default function KycQueue() {
  const [items, setItems] = useState<KycItem[]>(kycQueue);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    setLoadingId(id);
    // TODO: Connect to backend /api/admin/kyc/:id with { action }
    await new Promise(r => setTimeout(r, 900));
    setItems(prev => prev.filter(i => i.id !== id));
    setLoadingId(null);
    const item = items.find(i => i.id === id);
    if (action === 'approve') {
      toast.success(`KYC approved for ${item?.name}`, { description: 'Account is now fully verified.' });
    } else {
      toast.error(`KYC rejected for ${item?.name}`, { description: 'Investor notified to resubmit documents.' });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <h3 className="text-base font-semibold text-gray-900">KYC Review Queue</h3>
          <p className="text-sm text-gray-400 mt-0.5">{items.length} pending reviews</p>
        </div>
        {items.length > 0 && (
          <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">{items.length} Pending</span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <ShieldCheck size={32} className="mx-auto text-emerald-300 mb-3" />
          <p className="text-sm font-semibold text-gray-400">All KYC reviews complete</p>
          <p className="text-xs text-gray-300 mt-1">No pending verifications at this time</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {items.map((item) => (
            <div key={item.id} className="px-5 py-3.5 hover:bg-gray-50/50 transition-colors duration-100">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                    {item.daysWaiting >= 2 && (
                      <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full shrink-0">
                        <Clock size={10} />
                        {item.daysWaiting}d
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 font-mono">{item.accountNo} · {item.phone}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <FileText size={11} className="text-gray-300" />
                    <span className="text-xs text-gray-400">{item.docType} · Submitted {item.submittedDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleAction(item.id, 'approve')}
                    disabled={loadingId === item.id}
                    className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 disabled:opacity-50 transition-all duration-150 active:scale-95"
                    title="Approve KYC"
                  >
                    <ShieldCheck size={15} />
                  </button>
                  <button
                    onClick={() => handleAction(item.id, 'reject')}
                    disabled={loadingId === item.id}
                    className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 disabled:opacity-50 transition-all duration-150 active:scale-95"
                    title="Reject KYC"
                  >
                    <ShieldX size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}