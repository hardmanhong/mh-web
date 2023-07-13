import request from '../request'
import { GetList } from '../type'

export type Post = {
  id?: number
  title: string
  content: string
  createdAt: string
}
export const getPostList: GetList<Required<Post>, { title?: string }> = (
  data
) => {
  return request.get('/post', data)
}

export const getPost = ({ id }: { id: string }): Promise<Required<Post>> => {
  return request.get(`/post/${id}`)
}

export const createPost = (
  data: Pick<Post, 'title' | 'content'>
): Promise<{ id: number }> => {
  return request.post('/post', data)
}

export const updatePost = (
  id: number | string,
  data: Omit<Post, 'id' | 'createdAt'>
) => {
  return request.put(`/post/${id}`, data)
}

export const deletePost = (id: number | string) => {
  return request.delete(`/post/${id}`)
}
