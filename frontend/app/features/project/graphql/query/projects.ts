export const PROJECTS_QUERY = `
  query Projects(
    $filter: ProjectFilterInput
  ) {
    projects(
      filter: $filter
    ) {
      items{
        id
        projectName
        description
        demoUrl
        createdAt
      }
      meta{
        page
        limit
        totalData
        totalPage
        hasNext
        hasPrevious
      }  
    }
  }
`
