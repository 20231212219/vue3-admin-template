// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import vue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier' // 👈 新增
import eslintConfigPrettier from 'eslint-config-prettier' // 👈 新增

export default [
  // 忽略文件
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/*.d.ts'],
  },

  // 基础 JS
  js.configs.recommended,

  // TypeScript
  ...tseslint.configs.recommended,

  // Vue
  ...vue.configs['flat/essential'],

  // Prettier 集成 👇
  eslintConfigPrettier,
  {
    files: ['**/*.{js,ts,vue}'],
    plugins: {
      prettier, // 启用 prettier 插件
    },
    rules: {
      'prettier/prettier': 'error', // 把 Prettier 错误当作 ESLint 错误
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
]
