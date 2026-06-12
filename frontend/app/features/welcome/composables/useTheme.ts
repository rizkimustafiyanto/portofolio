export const useTheme = () => {
  const colorMode = useState<'light' | 'dark'>('theme', () => 'light')

  const applyTheme = (theme: 'light' | 'dark') => {
    colorMode.value = theme

    if (import.meta.client) {
      localStorage.setItem('theme', theme)

      const root = document.documentElement
      root.classList.toggle('dark', theme === 'dark')
      root.style.colorScheme = theme
    }
  }

  const toggleTheme = () => {
    applyTheme(colorMode.value === 'dark' ? 'light' : 'dark')
  }

  const initTheme = () => {
    if (!import.meta.client) {
      return
    }

    const saved = localStorage.getItem('theme')

    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved)

      return
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    applyTheme(prefersDark ? 'dark' : 'light')
  }

  return {
    colorMode,
    applyTheme,
    toggleTheme,
    initTheme,
  }
}
