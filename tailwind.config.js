/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F7FF',
          100: '#BAE7FF',
          200: '#91D5FF',
          300: '#69C0FF',
          400: '#40A9FF',
          500: '#1890FF',
          600: '#096DD9',
          700: '#0050B3',
          800: '#003A8C',
          900: '#002766',
        },
        // Pride flag colors
        pride: {
          red: '#E40303',
          orange: '#FF8C00',
          yellow: '#FFED00',
          green: '#008026',
          blue: '#004DFF',
          purple: '#750787',
        },
        // Trans flag colors
        trans: {
          blue: '#55CDFC',
          pink: '#F7A8B8',
          white: '#FFFFFF',
        },
        // Non-binary flag colors
        nonbinary: {
          yellow: '#FFF430',
          white: '#FFFFFF',
          purple: '#9C59D1',
          black: '#000000',
        },
        // Bisexual flag colors
        bi: {
          pink: '#D60270',
          purple: '#9B4F96',
          blue: '#0038A8',
        },
        // Lesbian flag colors
        lesbian: {
          darkest: '#8A1E04',
          dark: '#C64D53',
          medium: '#E4ACCF',
          light: '#FFFFFF',
          lightest: '#D362A4',
        },
        // Pansexual flag colors
        pan: {
          pink: '#FF218C',
          yellow: '#FFD800',
          blue: '#21B1FF',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'heartbeat': 'heartbeat 1.5s ease infinite',
        'shimmer': 'shimmer 3s infinite',
        'confetti': 'confetti-explosion 1s ease-out forwards',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-position': '50% 0%',
          },
          '50%': {
            'background-position': '50% 100%',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-position': '0% 0%',
          },
          '50%': {
            'background-position': '100% 100%',
          },
        },
        'heartbeat': {
          '0%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.25)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.15)' },
          '60%': { transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%) rotate(30deg)' },
          '100%': { transform: 'translateX(100%) rotate(30deg)' },
        },
      },
      boxShadow: {
        'pride': '0 4px 14px 0 rgba(117, 7, 135, 0.39)',
      },
      backgroundImage: {
        'pride-gradient': 'linear-gradient(to right, var(--pride-red), var(--pride-orange), var(--pride-yellow), var(--pride-green), var(--pride-blue), var(--pride-purple))',
        'trans-gradient': 'linear-gradient(to right, var(--trans-blue), var(--trans-pink), var(--trans-white), var(--trans-pink), var(--trans-blue))',
        'nonbinary-gradient': 'linear-gradient(to right, var(--nonbinary-yellow), var(--nonbinary-white), var(--nonbinary-purple), var(--nonbinary-black))',
        'bi-gradient': 'linear-gradient(to right, var(--bi-pink), var(--bi-purple), var(--bi-blue))',
        'lesbian-gradient': 'linear-gradient(to right, var(--lesbian-darkest), var(--lesbian-dark), var(--lesbian-medium), var(--lesbian-light), var(--lesbian-lightest))',
        'pan-gradient': 'linear-gradient(to right, var(--pan-pink), var(--pan-yellow), var(--pan-blue))',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} 