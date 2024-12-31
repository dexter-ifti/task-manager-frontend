/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          50: 'var(--color-sage-50)',
          100: 'var(--color-sage-100)',
          200: 'var(--color-sage-200)',
          300: 'var(--color-sage-300)',
          400: 'var(--color-sage-400)',
          500: 'var(--color-sage-500)',
          600: 'var(--color-sage-600)',
          700: 'var(--color-sage-700)',
          800: 'var(--color-sage-800)',
          900: 'var(--color-sage-900)',
        },
      },
    },
  },
  plugins: [],
};