export const useTheme = () => {
  const colorMode = useState<'light' | 'dark'>('theme', () => 'light')

  const isDark = computed(() => colorMode.value === 'dark')

  const applyTheme = (mode: 'light' | 'dark') => {
    colorMode.value = mode

    if (import.meta.client) {
      localStorage.setItem('theme', mode)

      document.documentElement.classList.toggle('dark', mode === 'dark')

      document.documentElement.style.colorScheme = mode
    }
  }

  const toggleTheme = () => {
    applyTheme(isDark.value ? 'light' : 'dark')
  }

  const initTheme = () => {
    if (!import.meta.client) return

    const saved = localStorage.getItem('theme')

    if (saved === 'light' || saved === 'dark') {
      applyTheme(saved)
      return
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    applyTheme(prefersDark ? 'dark' : 'light')
  }

  return {
    colorMode,
    isDark,
    applyTheme,
    toggleTheme,
    initTheme,
  }
}
