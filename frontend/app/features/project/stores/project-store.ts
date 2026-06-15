export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: null as any | null,
    projectDetail: undefined as any | undefined,
    authChecked: false,
  }),
  actions: {
    getAll(data: { project: any }) {
      this.projects = data.project
    },
    getDetails() {
      this.projectDetail = undefined
    },
  },
})
