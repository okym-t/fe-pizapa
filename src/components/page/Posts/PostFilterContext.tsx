import { createContext, FC, ReactNode, useContext, useState } from 'react'

type PostListFilter = {
  searchStr: string
  updateSearchStr: (value: string) => void
  status: number
  changeStatus: (tabIndex: number) => void
}

const defaultFilter: PostListFilter = {
  searchStr: '',
  updateSearchStr: () => void 0,
  status: 0,
  changeStatus: () => void 0,
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

  const [status, setStatus] = useState(0)
  const changeStatus = (tabIndex: number) => {
    setStatus(tabIndex)
  }

  const value = {
    searchStr,
    updateSearchStr,
    status,
    changeStatus,
  }

  return (
    <PostListFilterContext.Provider value={value}>
      {children}
    </PostListFilterContext.Provider>
  )
}
