const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        arab: ['noorehira', 'cursive', 'serif'],
      },
      colors: {
        "primary": {
          DEFAULT: "#2ca58d"
        },
        "secondary": {
          DEFAULT: "#84bc9c",
        },
        "oxford-blue": {
          DEFAULT: "#0a2342"
        },
        "violet-red": {
          DEFAULT: "#f46197",
        },
        "floral-white": {
          DEFAULT: "#fffdf7",
        },
        "muharram": colors.amber,
        "shafar": colors.blue,
        "rabiul-awal": colors.blueGray,
        "rabiul-akhir": colors.indigo,
        "jumadil-awal": colors.emerald,
        "jumadil-akhir": colors.fuchsia,
        "rajab": colors.cyan,
        "syaban": colors.violet,
        "ramadhan": colors.teal,
        "syawal": colors.lime,
        "zulqaidah": colors.orange,
        "zulhijjah": colors.pink,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
