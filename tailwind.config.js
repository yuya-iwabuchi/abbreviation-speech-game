const colors = require('tailwindcss/colors')

const customColors = require('./src/colors')

module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx,css}'],
  theme: {
    colors: {
      ...customColors,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
    },
    fontFamily: {
      sans: ['Barlow', 'sans-serif'],
      serif: ['Roboto Slab', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}
