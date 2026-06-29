export const PROJECT_ID_QUERY = `
  query Project(
    $id: ID!
  ) {
    project(
      id: $id
    ) {
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
  }
`
