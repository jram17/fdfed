/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      fontFamily: {
        'formdata': ['Roboto', 'sans-serif'],
        'title': ['Faustina Variable', 'sans-serif']
      }
    },
  },
  plugins: [],
}

