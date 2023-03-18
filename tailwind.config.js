/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        wiggle: "wiggle 3s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(10px)" },
        },
      },
    },
  },
  plugins: [],
};
