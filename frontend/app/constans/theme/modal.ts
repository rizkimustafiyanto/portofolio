export const modal = {
  overlay: `
    fixed
    inset-0
    bg-slate-950/40
    backdrop-blur-sm
  `,

  container: `
    fixed
    inset-0
    flex
    items-center
    justify-center
    p-4
  `,

  content: `
    w-full
    max-w-2xl
    rounded-3xl
    border
    border-black/5
    bg-white/90
    backdrop-blur-xl
    shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)]

    dark:border-white/10
    dark:bg-slate-900/80
  `,

  header: `
    flex
    items-center
    justify-between
    border-b
    border-black/5
    px-6
    py-4

    dark:border-white/10
  `,

  body: `
    px-6
    py-5
  `,

  footer: `
    flex
    justify-end
    gap-3
    border-t
    border-black/5
    px-6
    py-4

    dark:border-white/10
  `,

  title: `
    text-lg
    font-semibold
    text-slate-800
    dark:text-slate-50
  `,
}
