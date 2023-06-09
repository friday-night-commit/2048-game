module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint', 'react'],
  ignorePatterns: ['**/dist/**/*.js', '**/ssr-dist/**/*.js',],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    '@typescript-eslint/quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-empty-function': 0,
    'no-multi-spaces': 'error',
    'no-console': 'error',
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
};
