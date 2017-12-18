module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint-config-konrad',
  env: {
    browser: true
  },
  rules: {},
  "globals": {
    "safari": true
  }
};
