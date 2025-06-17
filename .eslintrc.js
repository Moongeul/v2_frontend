// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // 👉 prettier와 연동
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error', // prettier 룰을 eslint에 적용
    'react/react-in-jsx-scope': 'off', // react 17 이상에선 필요 없음
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
  settings: {
    react: { version: 'detect' },
  },
}
