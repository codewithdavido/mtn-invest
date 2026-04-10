'use client';
import { Toaster } from 'sonner';

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '14px',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
        },
        classNames: {
          success: 'border-emerald-100',
          error: 'border-red-100',
        },
      }}
      richColors
    />
  );
}