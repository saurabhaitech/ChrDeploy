/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#AA013F",
        secondary: "#02006B",
        secondary02: "#F5F5F5",
        neutral10: "#E2E2E2",
        neutral06: "#999999",
        neutral05: "#858585",
        disabled: "#D6D6D6",
        secondary01: "#F0F0F6",
        neutral01: "#1D1D1D",
        neutral02: "#474747",
        neutral03: "#5C5C5C",
        neutral09: "#D6D6D6",
        light: "#FFFFFF",
        dark: "#000000",
        tipsbg: "#0000660D",
        danger: "#E54545",
        lightBlue: "#D0F0FE",
      },
    },
  },
  plugins: [],
};
