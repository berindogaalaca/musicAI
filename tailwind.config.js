/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.html", "./src/pages/*.html"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "custom-bg": "#161616",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
