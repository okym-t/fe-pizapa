import { createContext, FC, ReactNode, useContext, useState } from 'react'

type PostListFilter = {
  searchStr: string
  updateSearchStr: (value: string) => void
  // status: number | null
}

const defaultFilter: PostListFilter = {
  searchStr: '',
  updateSearchStr: () => void 0,
  // status: null,
} as const

const PostListFilterContext = createContext(defaultFilter)

export const usePostListFilterContext = () => useContext(PostListFilterContext)

type Props = {
  children: ReactNode
}

export const PostListFilterProvider: FC<Props> = ({ children }) => {
  const [searchStr, setSearchStr] = useState('')
  const updateSearchStr = (value: string) => {
    setSearchStr(value)
  }

  const value = {
    searchStr,
    updateSearchStr,
  }

  return (
    <PostListFilterContext.Provider value={value}>
      {children}
    </PostListFilterContext.Provider>
  )
}
