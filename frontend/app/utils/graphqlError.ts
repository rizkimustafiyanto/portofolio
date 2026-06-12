// import { ClientError } from 'graphql-request'

// export const extractGraphqlError = (
//   error: unknown,
// ): string => {
//   if (error instanceof ClientError) {
//     return (
//       error.response?.errors?.[0]?.message ||
//       'Terjadi kesalahan'
//     )
//   }

//   return 'Terjadi kesalahan server'
// }

export const extractGraphqlError = (err: any) => {
  return err?.response?.errors?.[0]?.message || err?.message || 'Terjadi kesalahan'
}
