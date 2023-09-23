/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto"', "sans-serif"],
      },
      colors: {
        textPrimary: "#121212",
        bgPrimary: "#e5e8eb",
        hover: "#F5F5F5",
        //hover: "#FFFFCF",
        texterror: "#F08080",
        texttrue: "#98FB98",
        border: "#e2e2e2",
        settingChoose: "#4096ff",
        settingHover: "#F5F5F5",
        textSetting: "#778899",
        textButton: "#696969",
      },
      boxShadow: {
        "focus-visible": "none",
      },
    },
  },
  plugins: [],
};
