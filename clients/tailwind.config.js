/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      inset: {
        '20%': "20%",
        '30%': '30%'
      },
      height: {
        '400': '400px',
      }
    },
  },

  plugins: [],
}
