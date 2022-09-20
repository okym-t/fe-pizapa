import { useDeferredValue, useMemo } from 'react'
import { PostStatus } from 'src/types/api.types'
import { PostWithTags, Tag } from './usePost'

export const useFilterPostList = (
  posts: PostWithTags[] | undefined,
  searchStr: string,
  filterStatus: typeof PostStatus[keyof typeof PostStatus] | null
) => {
  const deferredSearchStr = useDeferredValue(searchStr)

  const postList = useMemo(() => {
    if (!posts) return []
    return posts.filter(
      ({ name, title, status, tags }) =>
        filterBySearchStr(deferredSearchStr, name, title, tags) &&
        filterByStatus(filterStatus, status)
    )
  }, [deferredSearchStr, filterStatus, posts])

  return [postList] as const
}

const filterByStatus = (
  filterStatus: typeof PostStatus[keyof typeof PostStatus] | null,
  status: number | null
) => {
  return filterStatus === null ? true : status === filterStatus
}

const filterBySearchStr = (
  searchStr: string,
  name: string,
  title: string,
  tags: Tag[]
) => {
  return (
    name.includes(searchStr) ||
    title.includes(searchStr) ||
    tags
      .map(({ tag }) => tag.name)
      .some((tagName) => tagName.includes(searchStr))
  )
}
