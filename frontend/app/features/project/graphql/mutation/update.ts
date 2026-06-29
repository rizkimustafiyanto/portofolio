export const UPDATE_MUTATION = `
mutation UreateProject($id: ID! ,$input: UpdateProjectInput!) {
  updateProject(id: $id , input: $input) {
    slug
    title
    description
    role
    duration
    demoURL
    detail {
      problem
      solution
      responsibilities {
        responsibility
        sortOrder
      }
      results {
        result
        sortOrder
      }
    }
  }
}
`
