/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/index.css",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          bg: '#F8F6F1',
          'bg-soft': '#FBF9F6',
          text: '#171717',
          muted: '#6B6B66',
          green: '#173B35',
          'green-soft': '#EDF3EE',
          gold: '#B58A4A',
          'gold-soft': 'rgba(181,138,74,0.12)',
          white: '#FFFFFF',
          border: 'rgba(23,23,23,0.1)',
          'border-hover': 'rgba(23,23,23,0.25)',
        },
        // Semantic aliases for a consistent design language
        primary: {
          DEFAULT: '#173B35',
          soft: '#EDF3EE',
        },
        accent: {
          DEFAULT: '#B58A4A',
          soft: 'rgba(181,138,74,0.12)',
        },
        neutral: {
          DEFAULT: '#171717',
          muted: '#6B6B66',
        },
        surface: {
          DEFAULT: '#F8F6F1',
          soft: '#FBF9F6',
        },
      },
      fontFamily: {
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
