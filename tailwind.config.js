const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

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
      sans: ['Barlow', ...defaultTheme.fontFamily.sans],
      serif: ['Roboto Slab', ...defaultTheme.fontFamily.serif],
    },
    extend: {},
  },
  plugins: [],
}
