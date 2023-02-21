/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeOut: "fadeOut .25s linear",
      },
      keyframes: {
        fadeOut: {
          "0%": {
            transform: "rotate(0deg)",
            opactiy: "1",
            right: "0%",
            top: "0%",
          },
          "100%": {
            transform: "rotate(-90deg)",
            opacity: "0",
            right: "50%",
            top: "50%",
          },
        },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [],
};
