export const PROJECT_ID_QUERY = `
  query Project(
    $id: ID!
  ) {
    project(
      id: $id
    ) {
      id
      projectName
      description
      demoUrl
      createdAt
      updatedAt
    }
  }
`
