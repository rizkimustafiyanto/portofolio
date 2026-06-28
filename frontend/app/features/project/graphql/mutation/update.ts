export const UPDATE_MUTATION = `
  mutation UpdateProject(
    $id: ID!
    $input: UpdateProjectInput!
  ) {
    updateProject(
      id: $id
      input: $input
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
