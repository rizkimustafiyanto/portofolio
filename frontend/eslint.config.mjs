import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    ignores: [
      'eslint.config.mjs',
      '.nuxt/**',
      'dist/**',
      'node_modules/**',
      '.output/**',
    ],

    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',

      'vue/multi-word-component-names': 'off',
      'vue/no-setup-props-reactivity-loss': 'warn',
      'vue/prefer-import-from-vue': 'warn',

      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },
  {
    files: ['app.vue', 'error.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
)
