import useSWR from 'swr'
import { Post } from '@prisma/client'

export type PostWithTags = {
  tags: Tag[]
} & Post

export interface Tag {
  id: number
  name: string
}

export const usePostList = () => {
  return useSWR<PostWithTags[]>('/api/post')
}

export const usePostById = ({ id }: { id: string }) => {
  return useSWR<PostWithTags>(`/api/post/${id}`)
}
