const animationSpeed = ".2s";

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "2xs": [".625rem", ".75rem"],
      },
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
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [],
};
