export type ActionResponsibility = {
  responsibility: string
  sortOrder: number
}

export type ActionResult = {
  result: string
  sortOrder: number
}

export type ActionProjectDetail = {
  problem: string
  solution: string
  responsibilities: ActionResponsibility[]
  results: ActionResult[]
}

export type ActionProject = {
  slug: string
  title: string

  description: string
  role: string
  duration: string
  demoURL: string

  detail: ActionProjectDetail
}
