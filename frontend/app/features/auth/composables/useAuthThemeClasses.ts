import { theme } from '~/constans/theme'

export const useAuthThemeClasses = () => {
  return {
    page: theme.colors.background,
    surface: theme.colors.surface,
    heading: theme.colors.text.primary,
    text: theme.colors.text.secondary,
    muted: theme.colors.text.muted,
  }
}
