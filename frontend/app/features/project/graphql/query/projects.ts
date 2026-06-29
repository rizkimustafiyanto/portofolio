export const PROJECTS_QUERY = `
  query Projects(
    $filter: ProjectFilterInput
  ) {
    projects(
      filter: $filter
    ) {
      items{
        id
        slug
        title
        description
        demoURL
        role
        duration
        createdAt
        updatedAt
        detail {
          id
          problem
          solution
          responsibilities {
            id
            responsibility
            sortOrder
          }
          results {
            id
            result
            sortOrder
          }
        }
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
