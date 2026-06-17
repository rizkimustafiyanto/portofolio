export const select = {
  variant: {
    default: `
      bg-white
      dark:bg-slate-900

      border
      border-black/10
      dark:border-white/10

      text-slate-800
      dark:text-slate-100

      focus:border-slate-400
      dark:focus:border-slate-500

      focus:ring-2
      focus:ring-slate-200
      dark:focus:ring-slate-800
    `,

    filled: `
      bg-slate-100
      dark:bg-slate-800

      border
      border-transparent

      text-slate-800
      dark:text-slate-100

      focus:border-slate-400
      dark:focus:border-slate-500

      focus:ring-2
      focus:ring-slate-200
      dark:focus:ring-slate-800
    `,

    ghost: `
      bg-transparent

      border
      border-transparent

      text-slate-800
      dark:text-slate-100

      focus:border-slate-300
      dark:focus:border-slate-700
    `,
  },

  trigger: `
    w-full
    rounded-lg
    outline-none
    transition-all
  `,

  dropdown: `
    rounded-lg

    border
    border-black/10
    dark:border-white/10

    bg-white
    dark:bg-slate-900

    shadow-lg
  `,

  option: `
    cursor-pointer

    transition-colors

    hover:bg-slate-100
    dark:hover:bg-slate-800
  `,

  optionSelected: `
    bg-slate-100
    dark:bg-slate-800

    font-medium
  `,

  optionDisabled: `
    cursor-not-allowed
    opacity-50
  `,

  searchInput: `
    border-b
    border-black/10
    dark:border-white/10

    bg-transparent

    outline-none
  `,

  error: `
    border-red-500
    focus:border-red-500
    focus:ring-red-100
  `,

  icon: `
    text-muted-foreground
  `,

  invalid: `
    border-red-500
    focus:border-red-500
    focus:ring-red-100
  `,
}
