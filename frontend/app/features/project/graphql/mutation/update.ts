export const UPDATE_MUTATION = `
  mutation UpdateProject(
    $id: ID!
    $input: UpdateProjectInput!
  ) {
    udpateProject(
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
