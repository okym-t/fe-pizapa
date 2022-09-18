import { useMemo, useState } from 'react'
import { PostStatus } from 'src/types/api.types'

export const useFilterPostTab = () => {
  const [tabIndex, setTabIndex] = useState(0)

  const handleClickTab = (index: number) => {
    setTabIndex(index)
  }

  const filterStatus = useMemo(() => {
    if (tabIndex === 0) return null
    return tabIndex === 1 ? PostStatus.open : PostStatus.closed
  }, [tabIndex])

  return [handleClickTab, filterStatus] as const
}
