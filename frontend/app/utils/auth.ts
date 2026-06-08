export type DemoUser = {
  id: number
  name: string
  email: string
}

export function createDemoUser(email: string): DemoUser {
  return {
    id: 1,
    name: 'Dev User',
    email,
  }
}
