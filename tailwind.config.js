/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");


module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppin: ["var(--font-poppin)", ...fontFamily.sans],
      },
      colors: {
        primaryPurple: "#6527BE",
        primaryViolet: "#9681EB",
        primaryCyan: "#45CFDD",
        graySeven: "#121212",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")({
    strategy:"class"
  })],
}
