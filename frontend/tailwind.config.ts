import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './features/**/*.{vue,js,ts}',
    './constans/**/*.{js,ts}',
  ],
}
