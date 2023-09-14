/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto"', "sans-serif"],
      },
      colors:{
        textPrimary: "#121212",
        bgPrimary: "#e5e8eb"
      }
    },
  },
  plugins: [],
};
