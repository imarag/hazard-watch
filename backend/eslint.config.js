import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser }
  },
  tseslint.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/jsx-quotes': ['warn', 'prefer-single'],
      '@stylistic/quotes': ['warn', 'single']
    }
  }
]);
