export const button = {
  filled: `
    rounded-full

    border
    border-black/5

    bg-white
    text-slate-800


    transition-all

    hover:bg-slate-50
    hover:shadow-[0_12px_16px_-32px_rgba(15,23,42,0.25)]

    dark:border-white/10
    dark:bg-white
    dark:text-slate-950
    dark:hover:bg-slate-100
  `,

  text: `
    rounded-full
    bg-transparent
    text-slate-700
    hover:bg-slate-100/80

    dark:text-slate-200
    dark:hover:bg-white/5
  `,

  dangerFilled: `
    rounded-full
    border
    border-red-950/10

    bg-red-600
    text-white

    shadow-[0_12px_28px_-16px_rgba(244,63,94,0.6)]

    hover:bg-red-700

    dark:border-red-200/20
    dark:bg-red-500
    dark:text-slate-950
    dark:hover:bg-red-400
  `,

  dangerText: `
    rounded-full
    bg-transparent
    text-red-600
    hover:bg-red-50

    dark:text-red-300
    dark:hover:bg-red-500/10
  `,

  welcomeButton: `
    group
    relative
    overflow-hidden

    rounded-full
    border

    px-8
    py-4

    font-medium
    transition-all

    border-black/5
    bg-slate-950
    text-white

    hover:bg-slate-800

    dark:border-white/10
    dark:bg-white/20
    dark:text-white
    dark:hover:bg-white/10
  `,
}
