export const DELETE_MUTATION = `
  mutation DeleteProject(
    $id: ID!
  ) {
    deleteProject(
      id: $id
    )
  }
`
