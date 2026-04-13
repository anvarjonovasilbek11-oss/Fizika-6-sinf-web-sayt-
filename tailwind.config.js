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
        'space-dark': "#0f172a",
        'neon-purple': "#bc13fe",
        'electric-blue': "#00d2ff",
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
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', filter: 'blur(10px)' },
          '50%': { opacity: '1', filter: 'blur(15px)' },
        }
      }
    },
  },
  plugins: [],
}
