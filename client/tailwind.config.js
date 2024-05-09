/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 0 50px 0 rgba(255, 255, 255, 0.4)',
        'custom1': '0 0 5px 0 rgba(255, 255, 255, 0.4)',
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
}

