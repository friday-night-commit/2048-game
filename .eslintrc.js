module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    'max-len': [2, 120, {
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true,
      'ignoreComments': true
    }],
    'quotes': [
      2,
      'single',
      {
        'avoidEscape': true
      }
    ],
  }
}
