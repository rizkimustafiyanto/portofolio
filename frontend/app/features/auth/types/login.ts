export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  user: User
}

export type User = {
  id: number
  name: string
  email: string
}
