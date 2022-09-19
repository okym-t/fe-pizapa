import useSWR from 'swr'
import { Post } from '@prisma/client'

export type PostWithTags = {
  tags: Tag[]
} & Post

export interface Tag {
  assignedBy: string
  tag: {
    id: number
    name: string
  }
}

export const usePostList = () => {
  return useSWR<PostWithTags[]>('/api/post')
}
