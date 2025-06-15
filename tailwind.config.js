/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f5f5",
          500: "#343a40",
          700: "#314F84",
        },
        body: {
          black: "#171717",
          gray: "#4E4F54",
          "blue-light": "#B0BDD4"
        }
      },
      screens: {
        "2sm": "375px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "100%": { opacity: 0 },
          "0%": { opacity: 1 },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s linear",
        "fade-out": "fadeOut 0.5s linear",
      },
    },
  },
  plugins: [],
};
