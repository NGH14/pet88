module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
  importOrder: [
    '^react',
    '<THIRD_PARTY_MODULES>',
    './^.style(.*)$',
    '^.css$',
    '^components/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-hermes-parser'],
};
