export type ApiResponse<T> = {
  data: T,
  message: string,
  success: boolean,
}

export type ApiErrorResponse = {
  message: string,
  success: boolean,
  statusCode: number,
}