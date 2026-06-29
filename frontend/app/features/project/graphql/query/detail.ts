export const PROJECT_DETAIL_ID_QUERY = `
  query ProjectDetail(
    $projectId: ID!
  ) {
    projectDetail(
      projectId: $projectId
    ) {
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
`
