/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  trailingComma: "all",
  singleQuote: true,
  useTabs: false,
  tabWidth: 2,
  printWidth: 120,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.js',
};
