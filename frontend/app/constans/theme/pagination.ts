export const pagination = {
  shell: `
    rounded-full
    border

    border-black/5
    dark:border-white/10

    bg-white/80
    dark:bg-slate-900/60

    backdrop-blur-xl

    p-2

    shadow-[0_18px_40px_-24px_rgba(15,23,42,0.2)]
  `,

  item: `
    inline-flex
    items-center
    justify-center

    rounded-full

    font-medium

    transition-all
    duration-200

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-amber-400/50

    dark:focus-visible:ring-amber-300/40
  `,

  active: `
    bg-amber-100
    text-amber-800

    hover:bg-amber-200

    dark:bg-amber-500/15
    dark:text-amber-300
    dark:hover:bg-amber-500/25

    shadow-[0_10px_24px_-18px_rgba(245,158,11,0.45)]
  `,

  inactive: `
    bg-transparent

    text-slate-700
    dark:text-slate-300

    hover:bg-amber-50
    hover:text-amber-700

    dark:hover:bg-amber-500/10
    dark:hover:text-amber-300
  `,

  control: `
    inline-flex
    items-center
    justify-center

    rounded-full

    text-slate-700
    dark:text-slate-300

    transition-all
    duration-200

    hover:bg-amber-50
    hover:text-amber-700

    dark:hover:bg-amber-500/10
    dark:hover:text-amber-300
  `,

  ellipsis: `
    text-slate-400
    dark:text-slate-500
  `,
}
