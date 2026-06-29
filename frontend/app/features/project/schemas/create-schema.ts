import { z } from 'zod'

const responsibilitySchema = z.object({
  responsibility: z.string(),
  sortOrder: z.number(),
})

const resultSchema = z.object({
  result: z.string(),
  sortOrder: z.number(),
})

export const createProjectSchema = z.object({
  slug: z
    .string()
    .min(2, 'Project slug must be at least 2 characters long')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(2, 'Project name must be at least 2 characters long'),

  description: z.string(),

  role: z.string(),

  duration: z.string(),

  demoURL: z.string(),

  detail: z.object({
    problem: z.string(),
    solution: z.string(),
    responsibilities: z.array(responsibilitySchema),
    results: z.array(resultSchema),
  }),
})
