const {heroui} = require('@heroui/theme');
import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(alert|button|chip|date-picker|dropdown|form|input|link|navbar|number-input|pagination|spinner|table|toast|ripple|calendar|date-input|popover|menu|divider|checkbox|spacer).js"
  ],
  theme: {
    extend: {
      colors:{
        background: "rgb(var(--background))",
        text: "rgb(var(--text))",
        primary: "rgb(var(--primary))",
        secondary: "rgb(var(--secondary))",
        card: "rgb(var(--card))",
        "text-warning": "rgb(var(--text-warning))",
        "text-danger": "rgb(var(--text-danger))",
        "bg-danger": "rgb(var(--bg-danger))",
        "text-success": "rgb(var(--text-success))",
        "bg-success": "rgb(var(--bg-success))",
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}
