import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    loading: false,
    loadingText: '' as string,
  }),
  actions: {
    startLoading(text?: string) {
      this.loading = true
      this.loadingText = text || ''
    },
    stopLoading() {
      this.loading = false
      this.loadingText = ''
    },
  },
})
