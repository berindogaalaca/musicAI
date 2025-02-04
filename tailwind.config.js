/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.html", "./src/pages/*.html"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "custom-bg": "#161616",
      },
    },
  },
  plugins: [],
};
