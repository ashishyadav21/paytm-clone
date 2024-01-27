/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    container: {
      padding: '2rem',
      center: true,
    },
    colors: {
      'primary': '#fefefe',
      'white': '#fefefe',
      'skyBlue': '#e1f8ff',
      'primaryButton': '#002970',
      'grayBackground': '#f6f8fc',
      'black': '#000000',
      'primarySkyColor': '#00b9f5',
      'grayTextColor': '#444444',
      'placeholderColor': '#182233',
      'green': '#22c55e',
      'sky': {
        950: '#082f49',
        900: '#0c4a6e'
      },
      'gray': {
        900: "#808080"
      },
      'slate': {
        600: "#475569",
        500: '#64748b',
        400: '#94a3b8',
        300: '#cbd5e1'
      }

    },
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  plugins: [],
}

