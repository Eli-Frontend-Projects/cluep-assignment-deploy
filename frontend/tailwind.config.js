/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{jsx,js,ts,tsx}", // Include TypeScript files if you're using them
  ],
  theme: {
    extend: {
      fontFamily: {
        basier: ['BasierCircle', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
