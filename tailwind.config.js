// tailwind.config.js
module.exports = {
  darkMode: "class", // Enable class-based dark mode
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include all your JSX/TSX files for purging unused styles
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
