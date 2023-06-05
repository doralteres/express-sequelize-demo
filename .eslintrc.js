module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['./dist/**/*.js', './dist/*.js'],
  rules: {
    'object-curly-newline': [
      'error',
      {
        ObjectPattern: { multiline: true },
        ImportDeclaration: 'never',
        ExportDeclaration: { multiline: true, minProperties: 3 },
      },
    ],
    'import/extensions': ['error', 'never'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
