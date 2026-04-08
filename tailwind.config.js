/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",
        secondary: "#FF6584",
        accent: "#43CBFF",
        dark: {
          bg: "#0F172A",
          surface: "#1E293B",
          card: "#243047",
        },
        light: {
          bg: "#F8FAFC",
          surface: "#FFFFFF",
        }
      },
      fontFamily: {
        ui: ["Inter", "sans-serif"],
        heading: ["Nunito", "sans-serif"],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
