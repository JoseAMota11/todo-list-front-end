/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        mount: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ['mount-done']: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        ['mount-undone']: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '0.5', transform: 'translateX(0)' },
        },
      },
      animation: {
        mount: 'mount 300ms ease-in-out both',
        ['mount-done']: 'mount-done 500ms ease-in-out both',
        ['mount-undone']: 'mount-undone 500ms ease-in-out both',
      },
    },
  },
  plugins: [],
};
