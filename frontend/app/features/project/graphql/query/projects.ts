export const PROJECTS_QUERY = `
  query Projects(
    $filter: ProjectFilterInput
  ) {
    projects(
      filter: $filter
    ) {
      items
      meta  
    }
  }
`
