/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  trailingComma: "none",
  tabWidth: 2,
  semi: false,
  singleQuote: false,
  printWidth: 120,
  arrowParens: "avoid"
}
