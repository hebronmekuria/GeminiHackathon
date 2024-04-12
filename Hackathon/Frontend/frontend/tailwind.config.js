/** @type {import('tailwindcss').Config} */

// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};

module.exports = {
  content: ["Hackathon/Frontend/frontend/src/App.js", "Hackathon/Frontend/frontend/src/index.js"],
  theme: {
    extend: {},
  },
  plugins: [],
}

