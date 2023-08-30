/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./server/view/pages/*.ejs", "./server/view/components/*.ejs"],
  theme: {
    extend: {
      backgroundImage: {
        'url': {},
        'cover': {}
      }
    },
  },
  plugins: [],
};