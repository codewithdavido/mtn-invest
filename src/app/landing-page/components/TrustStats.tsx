'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Users, Banknote, Calendar, Award } from 'lucide-react';
import type { FC, SVGProps } from 'react';

type IconComponent = FC<SVGProps<SVGSVGElement> & { size?: number | string }>;

interface Stat {
  id: string;
  IconComponent: IconComponent;
  value: string;
  label: string;
  sub: string;
}

const stats: Stat[] = [
  { id: 'stat-investors', IconComponent: Users as IconComponent,    value: '247,000+',   label: 'Active Investors',         sub: 'Across Ghana & Nigeria' },
  { id: 'stat-aum',       IconComponent: Banknote as IconComponent, value: 'GH₵ 1.4B+', label: 'Assets Under Management',  sub: 'Total investor funds' },
  { id: 'stat-return',    IconComponent: Award as IconComponent,    value: '18.5%',      label: 'Highest Annual Rate',       sub: 'On 12-month fixed deposits' },
  { id: 'stat-years',     IconComponent: Calendar as IconComponent, value: '8 Years',    label: 'Trusted Since 2018',        sub: 'Regulated by Bank of Ghana' },
];

export default function TrustStats() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    if (ref?.current) obs?.observe(ref?.current);
    return () => obs?.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-mtn-yellow py-16">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats?.map((s, i) => (
            <div
              key={s?.id}
              className={`text-center transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-black/10 rounded-2xl mb-4 text-black">
                <s.IconComponent size={28} />
              </div>
              <p className="text-3xl font-bold text-black tabular-nums mb-1">{s?.value}</p>
              <p className="text-sm font-semibold text-black/80">{s?.label}</p>
              <p className="text-xs text-black/60 mt-0.5">{s?.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}