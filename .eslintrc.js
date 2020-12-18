module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11
  },
  plugins: [
    'react'
  ],
  rules: {
    semi: ['error', 'always'],
    'react/prop-types': ['error', { skipUndeclared: true }]
  }
};