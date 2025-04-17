/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
  plugins: [require("daisyui")],
  theme: {
    screens: {
      xsm: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif", "Arimo", "quicksand", "Montserrat"],
      },
    },
  },
};
