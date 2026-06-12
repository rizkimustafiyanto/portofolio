<template>
  <BaseSection
    id="hero"
    override="
      mx-auto
      flex
      min-h-screen
      max-w-7xl
      items-center
      px-6
      py-10
    "
  >
    <div class="grid w-full gap-12 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
      <div class="max-w-4xl">
        <span
          class="
            inline-flex
            items-center
            rounded-full
            border
            border-border/70
            bg-background/70
            px-4
            py-2
            text-sm
            shadow-sm
            backdrop-blur
          "
        >
          Frontend Engineer - Vue / Nuxt
        </span>

        <h1
          class="
            mt-8
            text-6xl
            font-light
            leading-[0.95]
            tracking-[-0.05em]
            md:text-8xl
          "
        >
          Building digital
          products that feel
          polished, fast,
          and easy to trust.
        </h1>

        <p
          class="
            mt-8
            max-w-2xl
            text-lg
            leading-relaxed
            text-muted-foreground
          "
        >
          I design and build frontend experiences for dashboards, internal tools, and product websites with a focus on clarity, motion, and maintainable architecture.
        </p>
      </div>

      <div
        class="
          rounded-3xl
          border
          border-border/70
          bg-background/80
          p-6
          shadow-[0_24px_80px_rgba(0,0,0,0.08)]
          backdrop-blur
          transition
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          hover:-translate-y-1
        "
      >
        <div class="text-sm tracking-[0.3em] text-muted-foreground">
          SNAPSHOT
        </div>

        <dl class="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <dt class="text-sm text-muted-foreground">
              Focus
            </dt>
            <dd class="mt-1 text-lg">
              UI Systems
            </dd>
          </div>

          <div>
            <dt class="text-sm text-muted-foreground">
              Strength
            </dt>
            <dd class="mt-1 text-lg">
              Performance
            </dd>
          </div>

          <div>
            <dt class="text-sm text-muted-foreground">
              Currently
            </dt>
            <dd class="mt-1 text-lg">
              Shipping products
            </dd>
          </div>

          <div>
            <dt class="text-sm text-muted-foreground">
              Location
            </dt>
            <dd class="mt-1 text-lg">
              Jakarta, ID
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </BaseSection>
</template>
