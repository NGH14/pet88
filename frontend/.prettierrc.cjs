module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: true,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  jsxBracketSameLine: true,
  arrowParens: 'avoid',
  importOrder: [
    '^react',
    '<THIRD_PARTY_MODULES>',
    './[^/]+\.style\.[^/]+$',
    '^.css$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-hermes-parser'],
};
