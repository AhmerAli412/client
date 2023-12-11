/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define your custom colors here
        bgg: '#1a1c1f',
        bgg1: '#24262b'
       
      }
    },
  },
  plugins: [require("daisyui")],
}

