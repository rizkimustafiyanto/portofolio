export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/management')) {
    setPageLayout('management')
  }
  if (to.path.startsWith('/portfolio')) {
    setPageLayout('portfolio')
  }
})
