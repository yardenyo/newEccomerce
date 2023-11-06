/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Roboto", "sans-serif"],
      },
      backgroundImage: {
        gradient: "linear-gradient(to right, #f9b434, #ffcb5d)",
      },
      colors: {
        container: "#f3f5f7",
      },
    },
  },
  plugins: [],
};
