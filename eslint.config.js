const react = require('eslint-plugin-react');
const parser = require('@typescript-eslint/parser');

module.exports = [{
  name: 'main',
  languageOptions: {
    parser,
    parserOptions: {
      project: './tsconfig.json',
      env: {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'webextensions': true
      },
    },

  },
  plugins: {
    react
  },
  rules: {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
}
];