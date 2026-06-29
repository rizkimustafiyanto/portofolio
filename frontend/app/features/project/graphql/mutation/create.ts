export const CREATE_MUTATION = `
mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
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
