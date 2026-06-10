<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <ClientOnly>
    <Toaster
      position="top-right"
      rich-colors
      close-button
      expand
    />
    <BaseLoadingOverlay />
  </ClientOnly>
</template>