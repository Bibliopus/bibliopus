module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'turbo',
    '@antfu',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {},
}
