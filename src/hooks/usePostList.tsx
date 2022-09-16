import useSWR from 'swr'
import { Post } from '@prisma/client'

export const usePostList = () => {
  return useSWR<Post[]>('/api/post')
}
