/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          background: "#1e1e2e",
          card: "#2e2e42",
          text: "#f5f5f7",
          input: "#3e3e5e",
          placeholder: "#b0b0c7",
        },
      },
    },
  },
  plugins: [],
};