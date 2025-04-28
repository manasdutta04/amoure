/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pride flag inspired colors
        pride: {
          red: '#E40303',
          orange: '#FF8C00',
          yellow: '#FFED00',
          green: '#008026',
          blue: '#004DFF',
          purple: '#750787',
          // Transparency variants
          'red-transparent': 'rgba(228, 3, 3, 0.1)',
          'orange-transparent': 'rgba(255, 140, 0, 0.1)',
          'yellow-transparent': 'rgba(255, 237, 0, 0.1)',
          'green-transparent': 'rgba(0, 128, 38, 0.1)',
          'blue-transparent': 'rgba(0, 77, 255, 0.1)',
          'purple-transparent': 'rgba(117, 7, 135, 0.1)',
          // Trans flag colors
          'trans-blue': '#5BCEFA',
          'trans-pink': '#F5A9B8',
          'trans-white': '#FFFFFF',
        },
        primary: {
          100: '#E6F7FF',
          200: '#BAE7FF',
          300: '#91D5FF',
          400: '#69C0FF',
          500: '#40A9FF', // Primary base color
          600: '#1890FF',
          700: '#096DD9',
          800: '#0050B3',
          900: '#003A8C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        rainbow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 3px rgba(228, 3, 3, 0.1), 0 0 0 6px rgba(255, 140, 0, 0.1), 0 0 0 9px rgba(255, 237, 0, 0.1), 0 0 0 12px rgba(0, 128, 38, 0.1), 0 0 0 15px rgba(0, 77, 255, 0.1), 0 0 0 18px rgba(117, 7, 135, 0.1)',
      },
      animation: {
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
        'rainbow-shift': 'rainbow-shift 8s linear infinite',
        'pulse-rainbow': 'pulse-rainbow 4s linear infinite',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'rainbow-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'pulse-rainbow': {
          '0%, 100%': { 
            boxShadow: '0 0 0 0 rgba(228, 3, 3, 0.4)' 
          },
          '20%': { 
            boxShadow: '0 0 0 0 rgba(255, 140, 0, 0.4)' 
          },
          '40%': { 
            boxShadow: '0 0 0 0 rgba(255, 237, 0, 0.4)' 
          },
          '60%': { 
            boxShadow: '0 0 0 0 rgba(0, 128, 38, 0.4)' 
          },
          '80%': { 
            boxShadow: '0 0 0 0 rgba(0, 77, 255, 0.4)' 
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} 