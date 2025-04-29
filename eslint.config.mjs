import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,ts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,ts}"], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  tseslint.configs.recommended,
  {
    ignores: ['eslint.config.mjs']
  },
  {
    rules: {
      "@typescript-eslint/naming-convention": "error",
    },
  }
]);