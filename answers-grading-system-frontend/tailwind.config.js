/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'amiri': ['Amiri', 'serif'],
        'rakkas': ['Rakkas', 'cursive'],
        'cairo': ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

