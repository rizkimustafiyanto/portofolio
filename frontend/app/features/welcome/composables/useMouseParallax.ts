export const useMouseParallax = () => {
  const x = ref(0)
  const y = ref(0)
  const targetX = ref(0)
  const targetY = ref(0)
  let frameId: number | null = null

  const handleMove = (event: MouseEvent) => {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    targetX.value = (event.clientX - centerX) * 0.02
    targetY.value = (event.clientY - centerY) * 0.02
  }

  const animate = () => {
    x.value += (targetX.value - x.value) * 0.08
    y.value += (targetY.value - y.value) * 0.08

    frameId = window.requestAnimationFrame(animate)
  }

  const reset = () => {
    targetX.value = 0
    targetY.value = 0
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleMove, {
      passive: true,
    })
    window.addEventListener('mouseleave', reset)
    frameId = window.requestAnimationFrame(animate)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMove)
    window.removeEventListener('mouseleave', reset)

    if (frameId !== null) {
      window.cancelAnimationFrame(frameId)
    }
  })

  return {
    x,
    y,
  }
}
