/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './assets/js/*.js'],
  theme: {
    extend: {
      colors: {
        // Deep green of the "MG" lettering in the logo (_fb-pack/images/profile.jpg)
        forest: { DEFAULT: '#0d431d', 900: '#0a3517', 800: '#0d431d', 700: '#17562a', 600: '#2a6b3c' },
        // Bright green of the leaf on the "G" in the logo
        leaf: { DEFAULT: '#5aa832', 300: '#a9d98a', 200: '#cfeabd', 100: '#e9f5e0' },
        // Muted sage from the Facebook cover banner
        sage: { DEFAULT: '#497256', 300: '#a8bcae' },
        // Warm gravel/stone tint for alternate sections (design choice, echoes their gravel work)
        stone: { 50: '#faf8f3', 100: '#f3efe5', 200: '#e6dfcf', 400: '#b9ac90' },
        ink: '#14261a',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': { from: { opacity: 0, transform: 'translateY(18px)' }, to: { opacity: 1, transform: 'none' } },
      },
      animation: { 'fade-up': 'fade-up .7s cubic-bezier(.2,.7,.2,1) both' },
      screens: { short: { raw: '(min-width: 1024px) and (max-height: 760px)' } },
    },
  },
  plugins: [],
};
