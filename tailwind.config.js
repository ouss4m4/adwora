/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/views/**/*.ejs", // Add this to target all EJS views in the 'views' folder
    "./src/styles/**/*.css", // Optional: If you use any custom CSS files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
