const animationSpeed = ".25s";

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        left: `left ${animationSpeed} linear`,
        right: `right ${animationSpeed} linear`,
      },
      keyframes: {
        left: {
          "0%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
        right: {
          "0%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [],
};
