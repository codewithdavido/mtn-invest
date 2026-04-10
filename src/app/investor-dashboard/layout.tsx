import ToastProvider from '@/components/ui/ToastProvider';

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastProvider />
    </>
  );
}