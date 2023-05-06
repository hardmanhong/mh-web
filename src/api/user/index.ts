import request from '../request'

export type User = {
  name: string
  password: string
}

export const login = (data: User) => {
  return request.post('/login', data)
}

export const signup = (data: User) => {
  return request.post('signup', data)
}
