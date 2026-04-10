/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        mtn: {
          yellow: '#FFCC00',
          'yellow-dark': '#E6B800',
          'yellow-light': '#FFF5CC',
          'yellow-50': '#FFFDE7',
          black: '#000000',
          'gray-50': '#F8F9FA',
          'gray-100': '#F3F4F6',
          'gray-200': '#E5E7EB',
          'gray-400': '#9CA3AF',
          'gray-500': '#6B7280',
          'gray-600': '#4B5563',
          'gray-700': '#374151',
          'gray-800': '#1F2937',
          'gray-900': '#111827',
        },
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px 0 rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        'modal': '0 20px 60px -10px rgba(0,0,0,0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.25s ease-out',
        'scale-in': 'scaleIn 0.15s ease-out',
        'pulse-yellow': 'pulseYellow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};