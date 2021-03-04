module.exports = {
  purge: [
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        arab: ['Mirza', 'cursive', 'serif'],
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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
