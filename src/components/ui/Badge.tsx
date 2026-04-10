import React from 'react';

type BadgeVariant = 'active' | 'pending' | 'matured' | 'suspended' | 'completed' | 'failed' | 'processing' | 'verified' | 'unverified' | 'flagged' | 'reversed';

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
  className?: string;
}

const variantMap: Record<BadgeVariant, { bg: string; text: string; dot: string; label: string }> = {
  active:      { bg: 'bg-emerald-50',  text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Active' },
  pending:     { bg: 'bg-amber-50',    text: 'text-amber-700',   dot: 'bg-amber-500',   label: 'Pending' },
  matured:     { bg: 'bg-blue-50',     text: 'text-blue-700',    dot: 'bg-blue-500',    label: 'Matured' },
  suspended:   { bg: 'bg-red-50',      text: 'text-red-700',     dot: 'bg-red-500',     label: 'Suspended' },
  completed:   { bg: 'bg-emerald-50',  text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Completed' },
  failed:      { bg: 'bg-red-50',      text: 'text-red-700',     dot: 'bg-red-500',     label: 'Failed' },
  processing:  { bg: 'bg-blue-50',     text: 'text-blue-700',    dot: 'bg-blue-400',    label: 'Processing' },
  verified:    { bg: 'bg-emerald-50',  text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Verified' },
  unverified:  { bg: 'bg-amber-50',    text: 'text-amber-700',   dot: 'bg-amber-500',   label: 'Unverified' },
  flagged:     { bg: 'bg-red-50',      text: 'text-red-700',     dot: 'bg-red-500',     label: 'Flagged' },
  reversed:    { bg: 'bg-gray-100',    text: 'text-gray-600',    dot: 'bg-gray-400',    label: 'Reversed' },
};

export default function Badge({ variant, label, className = '' }: BadgeProps) {
  const v = variantMap[variant];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-500 ${v.bg} ${v.text} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${v.dot}`} />
      {label ?? v.label}
    </span>
  );
}