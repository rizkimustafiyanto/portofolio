export const useEntrance = () => {
  const visible = ref(false)

  onMounted(() => {
    requestAnimationFrame(() => {
      visible.value = true
    })
  })

  return {
    visible,
  }
}
