export const LOGIN_MUTATION = `
  mutation Login(
    $input: LoginInput!
  ) {
    login(
      input: $input
    ) {
      token
      user {
        id
        email
        name
      }
    }
  }
`
