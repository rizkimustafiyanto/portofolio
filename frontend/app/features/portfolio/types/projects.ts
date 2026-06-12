export interface Project {
  id: string
  slug: string
  title: string
  description: string
  tags: string[]
  role: string
  duration: string
  case: ProjectCase
}

export interface ProjectCase {
  problem: string
  responsibilities: string[]
  solution: string
  results: string[]
}
