/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: "#00FF41",  // Cerberus Green
        attention: "#FFAA00", // Suspicious Activity
        alert: "#FF003C", // Pathogen Red
      },
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))', // Required for the Bio-Mesh
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(0, 255, 65, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.05) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}