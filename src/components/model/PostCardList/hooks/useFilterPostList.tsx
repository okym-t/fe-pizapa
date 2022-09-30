import { useDeferredValue, useMemo } from 'react'
import { usePostListFilterContext } from 'src/components/page/Posts/PostFilterContext'
import { PostStatus } from 'src/types/api.types'
import { PostWithTags, Tag } from '../../../../hooks/usePost'

export const useFilterPostList = (
  posts: PostWithTags[] | undefined,
  filterStatus: typeof PostStatus[keyof typeof PostStatus] | null
) => {
  const { searchStr } = usePostListFilterContext()

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
    tags.map(({ name }) => name).some((tagName) => tagName.includes(searchStr))
  )
}
