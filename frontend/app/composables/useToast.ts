export const useToast = () => {
  const nuxtApp = useNuxtApp()

  return {
    success: (msg: string) => nuxtApp.$toast.success(msg),

    error: (msg: string) => nuxtApp.$toast.error(msg),

    info: (msg: string) => nuxtApp.$toast.info(msg),
  }
}
