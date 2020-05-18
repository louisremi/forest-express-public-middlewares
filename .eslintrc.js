module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "tslint-config-prettier",
  ],
  rules: {
    "no-duplicate-imports": false,
    "array-type": [true, "array"],
    "padding-line-between-statements": "always",
    "no-warning-comment": { severity: "warning" },
    "prefer-template": true,
  },
}
