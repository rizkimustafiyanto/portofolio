import { z } from 'zod'

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(2, 'Project name must be at least 2 characters long')
    .nonempty('Project name is required'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
    .nonempty('Description is required'),
  link: z.string().url('Invalid URL').nonempty('Project link is required'),
})

export type CreateProjectData = z.infer<typeof createProjectSchema>
