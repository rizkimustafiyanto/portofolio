export const input = {
  wrapper: `space-y-2`,

  label: `
    text-sm
    font-medium
    text-slate-700
    dark:text-slate-300
  `,

  field: `
    w-full
    rounded-2xl
    border
    border-black/5
    bg-white/80
    px-4
    py-3
    text-slate-800
    backdrop-blur-xl
    outline-none
    transition

    placeholder:text-slate-400

    hover:border-slate-300

    focus:border-amber-400
    focus:ring-4
    focus:ring-amber-100

    dark:border-white/10
    dark:bg-slate-900/60
    dark:text-slate-100
    dark:placeholder:text-slate-500

    dark:hover:border-slate-700

    dark:focus:border-amber-500
    dark:focus:ring-amber-500/10
  `,

  error: `
    border-red-300
    focus:border-red-400
    focus:ring-red-100

    dark:border-red-500/40
    dark:focus:ring-red-500/10
  `,

  helper: `
    text-xs
    text-slate-500
    dark:text-slate-400
  `,

  errorText: `
    text-xs
    text-red-500
    dark:text-red-300
  `,
}
