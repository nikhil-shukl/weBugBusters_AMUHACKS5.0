/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme background and card colors
        dark: {
          bg: '#020617',    // Deep midnight navy
          card: '#0f172a',  // Slightly lighter navy for cards
          border: '#1e293b' // Muted border for glassmorphism
        },
        // Neon colors matching the text and UI elements in your screenshot
        primary: {
          DEFAULT: '#22d3ee', // Cyan (from "Academic")
          light: '#67e8f9',
          dark: '#0891b2',
        },
        secondary: {
          DEFAULT: '#c084fc', // Purple (from "Career")
          light: '#d8b4fe',
          dark: '#9333ea',
        },
        accent: {
          DEFAULT: '#f472b6', // Pink (from "Work")
          light: '#f9a8d4',
          dark: '#db2777',
        },
        // Add these aliases for compatibility with LandingPage
        'neon-blue': '#22d3ee',
        'neon-purple': '#c084fc',
        'neon-pink': '#f472b6',
        'neon-green': '#4ade80',
        'dark-lighter': '#0f172a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        // Custom gradient for the hero section text
        'hero-gradient': 'linear-gradient(to right, #22d3ee, #f472b6, #c084fc)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      // Add custom utilities for glass morphism
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}