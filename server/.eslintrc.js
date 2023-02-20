module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'consistent-return': 'off',
    'no-console': 'off',
    'import/no-unresolved': 'off',
    'no-underscore-dangle': 'off',
    'prefer-promise-reject-errors': 'off',
    'func-names': 'off',
    'new-cap': 'off',
    'no-shadow': 'off',
    'no-unused-expressions': 'off',
    'no-return-assign': 'off',
    'linebreak-style': 'off',
  },
};
