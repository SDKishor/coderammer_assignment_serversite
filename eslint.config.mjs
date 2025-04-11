import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },

    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    ignores: ['.node_modules/*'],
  },
])

const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')

module.exports = [
  // Any other config imports go at the top
  eslintPluginPrettierRecommended,
]
