import request from '../request'

export type User = {
  name: string
  password: string
}

export const login = (data: User) => {
  return request.post('/user/login', data)
}

export const signup = (data: User) => {
  return request.post('/user/register', data)
}

export const changePassword = (data: User & { newPassword: string }) => {
  return request.post('/user/changePassword', data)
}
