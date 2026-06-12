export const useSubmitGuard = () => {
  const loading = ref(false)

  const wrap = async <T>(fn: () => Promise<T>): Promise<T> => {
    if (loading.value) {
      return Promise.reject(new Error('Already loading'))
    }

    loading.value = true

    try {
      return await fn()
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    wrap,
  }
}
