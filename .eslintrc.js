module.exports = {
  'root': true,
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint'],
  'ignorePatterns': ['**/*.js'],
  'extends': ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
  'rules': {
    'quotes': [
      2,
      'single',
      {
        'avoidEscape': true
      }
    ],
    'no-use-before-define': [
      'warn',
      {
        'functions': true,
        'classes': false,
        'variables': true,
        'allowNamedExports': false
      }
    ],
    'no-param-reassign': ['warn']
  },
  'env': {
    'browser': true,
    'node': true,
    'jasmine': true
  }
}
