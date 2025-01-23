/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        flash: {
          '0%, 100%': { opacity: 0.7 },
          '50%': { opacity: 0.4 },
        },
      },
      animation: {
        flash: 'flash 1.5s infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
