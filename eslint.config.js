import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'


export default [
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {files: ['./app/**/*.{js,mjs,cjs,ts}']},
  { 
    rules: {
      indent: ['error', 2],
      semi: ['error', 'never'],
      quotes: ['error', 'single']
    }
  }
]