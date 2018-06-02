module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2017,
  },
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  globals: {
    $: true,
    ga: true,
    google: true,
  },
  rules: {
    'arrow-spacing': [2, {
      before: true,
      after: true,
    }],
    'no-console': 1,
    'no-multi-spaces': 0,
    'no-unused-vars': 1,
    'max-len': 1,
  },
};
