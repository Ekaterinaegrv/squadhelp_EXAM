module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['jest'],
  extends: 'eslint-config-airbnb',
  parser: 'babel-eslint',
  rules: {
    'no-console': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id'],
      },
    ],
  },
  env: {
    jest: true,
    browser: true,
  },
};
