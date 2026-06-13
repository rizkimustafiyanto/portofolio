export interface Project {
  id: string
  slug: string
  title: string
  description: string
  tags: string[]
  role: string
  duration: string
  gallery: ProjectGallery[]
  case: ProjectCase
}

export interface ProjectCase {
  problem: string
  responsibilities: string[]
  solution: string
  results: string[]
}

export interface ProjectGallery {
  image_url: string
  title: string
  description: string
}
