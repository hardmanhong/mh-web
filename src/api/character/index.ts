import request from '../request'

export type TCharacter = {
  id?: number
}
export const getCharacterList = (data?: any): Promise<TCharacter[]> => {
  return request.get('/character', data)
}

export const getCharacter = ({ id }: { id: string }) => {
  return request.get(`/character/${id}`)
}

export const createCharacter = (data: TCharacter): Promise<{ id: number }> => {
  return request.post('/character', data)
}

export const updateCharacter = (id: string, data: TCharacter) => {
  return request.put(`/character/${id}`, data)
}

export const deleteCharacter = (id: number) => {
  return request.delete(`/character/${id}`)
}
