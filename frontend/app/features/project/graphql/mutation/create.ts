export const CREATE_MUTATION = `
  mutation CreateProject(
    $input: CreateProjectInput!
  ) {
    createProject(
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
