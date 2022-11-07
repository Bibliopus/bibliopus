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
  rules: {
    '@typescript-eslint/semi': ['error', 'always'],
  },
}
