import { projectDetails } from './project-details'
import type { Project } from '../types/project'

const baseProjects = [
  {
    id: '01',
    slug: 'amms-dashboard',
    title: 'AMMS Dashboard',
    description:
      'Administration Monitoring Management System with role-based navigation, analytics panels, and workflow shortcuts.',
    tags: ['Vue', 'Express', 'PostgreSQL'],
    role: 'Fullstack Developer',
    duration: '2023 - 2024',
  },

  {
    id: '02',
    slug: 'laboratory-revamp',
    title: 'Laboratory Revamp',
    description: 'Healthcare platform redesign focused on usability and maintainability.',
    tags: ['Nuxt', 'GraphQL', 'Pinia'],
    role: 'Frontend Developer',
    duration: '2025',
  },

  {
    id: '03',
    slug: 'portfolio-template',
    title: 'Portfolio Template',
    description: 'Personal portfolio focused on storytelling and engineering.',
    tags: ['Nuxt', 'Tailwind'],
    role: 'Frontend Developer',
    duration: '2026',
  },
]

export const projects: Project[] = baseProjects.map((project) => ({
  ...project,
  case: projectDetails[project.slug],
}))
