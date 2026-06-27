export const tabs = {
  root: `
    flex
    flex-col
    gap-4
  `,

  list: `
    inline-flex
    items-center
    gap-1

    p-1

    rounded-2xl

    border
    border-black/5
    dark:border-white/10

    bg-white/80
    dark:bg-slate-900/60

    backdrop-blur-xl
  `,

  trigger: `
    inline-flex
    items-center
    justify-center

    rounded-xl

    px-4
    py-2

    text-sm
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

    shadow-[0_10px_24px_-18px_rgba(245,158,11,0.45)]

    dark:bg-amber-500/15
    dark:text-amber-300
  `,

  inactive: `
    text-slate-700

    hover:bg-amber-50
    hover:text-amber-700

    dark:text-slate-300
    dark:hover:bg-amber-500/10
    dark:hover:text-amber-300
  `,

  panel: `
    animate-in
    fade-in
    duration-200
  `,
}
