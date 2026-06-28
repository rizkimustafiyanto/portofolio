import { defineStore } from 'pinia'
import type { PaginationMeta } from '~/types/pagination'
import type { Project } from '../types/project'
import type { FormProjectData } from '../schemas/create-schema'

interface ProjectState {
  projects: Project[]
  meta: PaginationMeta
  projectDetail?: Project
  form: FormProjectData
}

const initialForm = (): FormProjectData => ({
  projectName: '',
  description: '',
  demoUrl: '',
})

export const useProjectStore = defineStore('project', {
  state: (): ProjectState => ({
    projects: [],
    meta: {
      page: 1,
      limit: 10,
      totalData: 0,
      totalPage: 1,
      hasNext: false,
      hasPrevious: false,
    },
    projectDetail: undefined,
    form: initialForm(),
  }),

  getters: {
    projectById: (state) => (id: string) => state.projects.find((project) => project.id === id),
  },

  actions: {
    setProjects(payload: { projects: Project[]; meta: PaginationMeta }): void {
      this.projects = payload.projects
      this.meta = payload.meta
    },

    setProjectDetail(project: Project): void {
      this.projectDetail = project
      this.fillForm()
    },

    addProject(project: Project): void {
      const exists = this.projects.some((item) => item.id === project.id)

      if (!exists) {
        this.projects.unshift(project)

        this.meta = {
          ...this.meta,
          totalData: this.meta.totalData + 1,
        }
      }
    },

    updateProject(project: Project): void {
      const index = this.projects.findIndex((item) => item.id === project.id)

      if (index !== -1) {
        this.projects[index] = project
      }

      if (this.projectDetail?.id === project.id) {
        this.projectDetail = project
      }
    },

    upsertProject(project: Project): void {
      const index = this.projects.findIndex((item) => item.id === project.id)

      if (index !== -1) {
        this.projects[index] = project
      } else {
        this.projects.unshift(project)

        this.meta = {
          ...this.meta,
          totalData: this.meta.totalData + 1,
        }
      }

      if (this.projectDetail?.id === project.id) {
        this.projectDetail = project
      }
    },

    removeProject(id: string): void {
      const before = this.projects.length

      this.projects = this.projects.filter((project) => project.id !== id)

      if (before !== this.projects.length) {
        this.meta = {
          ...this.meta,
          totalData: Math.max(0, this.meta.totalData - 1),
        }
      }

      if (this.projectDetail?.id === id) {
        this.projectDetail = undefined
      }
    },

    fillForm(project?: Project): void {
      const source = project ?? this.projectDetail
      if (!source) {
        this.resetForm()
        return
      }

      Object.assign(this.form, {
        projectName: source.projectName ?? '',
        description: source.description ?? '',
        demoUrl: source.demoUrl ?? '',
      })
    },

    resetForm(): void {
      Object.assign(this.form, initialForm())
    },

    reset(): void {
      this.projects = []
      this.projectDetail = undefined

      this.meta = {
        page: 1,
        limit: 10,
        totalData: 0,
        totalPage: 1,
        hasNext: false,
        hasPrevious: false,
      }
    },
  },
})
