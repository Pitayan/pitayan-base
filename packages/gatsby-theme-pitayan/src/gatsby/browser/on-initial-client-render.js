// Polyfill smooth scroll
const smoothscroll = require("smoothscroll-polyfill")
const { scrollToFragment, smoothAnchorScroll } = require("@pitayan/gatsby-theme-pitayan/src/utils")

module.exports = function onInitialClientRender() {
  // kick off polyfill
  smoothscroll.polyfill()

  smoothAnchorScroll()
  scrollToFragment()
}
