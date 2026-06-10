import type { LoginResponse, User } from "./login";

export interface LoginMutationResponse {
  login: LoginResponse
}

export interface MeQueryResponse {
  me: User
}