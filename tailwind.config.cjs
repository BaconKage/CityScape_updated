/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#f6f1e6',
        charcoal: '#0f1116',
        onyx: '#161924',
        stone: '#b7b0a6',
        urbanBlue: {
          50: '#dbe7f5',
          100: '#b8d0ec',
          200: '#8eb2de',
          500: '#2d5d8f',
          600: '#214a73',
        },
        steelBlue: {
          100: '#b8d4e9',
          200: '#87b4d2',
          500: '#4c78a5',
          600: '#3a6287',
        },
        emerald: {
          100: '#a9e8c8',
          200: '#64d1ac',
          500: '#1fa47f',
          600: '#168a6a',
        },
        rust: {
          100: '#ffd0b0',
          200: '#ffb183',
          500: '#cc6f34',
          600: '#a35628',
        },
        gold: {
          50: '#f6f2e5',
          100: '#eadfbe',
          200: '#ddc893',
          500: '#bfa46d',
          600: '#a88e4f',
          700: '#8d7642',
        },
      },
      boxShadow: {
        luxe: '0 12px 40px -22px rgba(0, 0, 0, 0.85)',
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'subtle-grid':
          'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      animation: {
        'float-slow': 'floatSlow 10s ease-in-out infinite',
        'marquee': 'marquee 28s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
