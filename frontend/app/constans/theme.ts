export const theme = {
  colors: {
    background:
      'bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.12),_transparent_28%),linear-gradient(180deg,_#fafaf9_0%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.08),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]',
    surface: 'bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl',
    border: 'border-black/5 dark:border-white/10',
    accent: 'text-amber-700 dark:text-amber-300',
    accentSurface: 'bg-amber-100/60 dark:bg-amber-500/10',
    button: {
      filled:
        'rounded-full border border-slate-950/5 bg-slate-950 text-white shadow-[0_12px_28px_-16px_rgba(15,23,42,0.65)] hover:bg-slate-800 dark:border-white/10 dark:bg-white dark:text-slate-950 dark:shadow-[0_12px_28px_-16px_rgba(255,255,255,0.18)] dark:hover:bg-slate-100',
      text: 'rounded-full bg-transparent text-slate-700 hover:bg-slate-100/80 dark:text-slate-200 dark:hover:bg-white/5',
      dangerFilled:
        'rounded-full border border-red-950/10 bg-red-600 text-white shadow-[0_12px_28px_-16px_rgba(244,63,94,0.6)] hover:bg-red-700 dark:border-red-200/20 dark:bg-red-500 dark:text-slate-950 dark:hover:bg-red-400',
      dangerText:
        'rounded-full bg-transparent text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-500/10',
    },

    text: {
      primary: 'text-slate-800 dark:text-slate-50',
      secondary: 'text-slate-600 dark:text-slate-300',
      muted: 'text-slate-400 dark:text-slate-500',
    },
  },
}
