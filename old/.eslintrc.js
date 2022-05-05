module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
    rules: {
        'no-unexpected-multiline': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-case-declarations': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
    },
};
