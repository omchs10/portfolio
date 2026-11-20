/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        girlish: {
          50: '#fff5f8',
          100: '#ffe8f0',
          200: '#fecddf',
          300: '#fca2c4',
          400: '#f6699e',
          500: '#eb387b',
          600: '#d71d60',
          700: '#b31249',
          800: '#94123f',
          900: '#7c1439',
          950: '#4a051e',
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(215, 29, 96, 0.12)',
        'glass-lg': '0 15px 45px 0 rgba(215, 29, 96, 0.22)',
        '3d-pink': '0 20px 40px -15px rgba(235, 56, 123, 0.35), 0 0 20px 0 rgba(254, 205, 223, 0.5)',
        '3d-card': '0 10px 30px -5px rgba(215, 29, 96, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
      }
    },
  },
  plugins: [],
}