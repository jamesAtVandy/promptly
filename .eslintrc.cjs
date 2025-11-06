/* eslint-env node */
module.exports = {
  root: true,
  ignorePatterns: ["dist/**", "node_modules/**"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  overrides: [
    {
      files: ["apps/client/**/*.{ts,tsx,js,jsx}"],
      env: { browser: true, es2021: true },
      plugins: ["react", "react-hooks", "@typescript-eslint"],
      extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      settings: { react: { version: "detect" } },
      rules: {
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }]
      }
    },
    {
      files: ["apps/server/**/*.ts"],
      env: { node: true, es2021: true },
      rules: {
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }]
      }
    }
  ]
}

