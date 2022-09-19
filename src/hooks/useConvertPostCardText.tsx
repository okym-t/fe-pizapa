import { useMemo } from 'react'
import { PostStatus } from 'src/types/api.types'

type ConvertPostCardText = ({
  createdAt,
  updatedAt,
  status,
}: {
  createdAt: Date
  updatedAt: Date
  status: number | null
}) => readonly [string, 'open' | 'closed', string]

export const useConvertPostCardText: ConvertPostCardText = ({
  createdAt,
  updatedAt,
  status,
}) => {
  const updatedText = useMemo(() => {
    const createdDate = new Date(createdAt)
    const updatedDate = new Date(updatedAt)
    if (updatedDate.getTime() - createdDate.getTime() < 1000) {
      const formattedText = createdDate.toLocaleDateString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
      })
      return `${formattedText}に作成`
    }
    const formattedText = updatedDate.toLocaleDateString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    })
    return `${formattedText}に更新`
  }, [createdAt, updatedAt])

  const statusText = useMemo(() => {
    return status === PostStatus.open ? 'open' : 'closed'
  }, [status])

  const statusColor = useMemo(() => {
    return status === PostStatus.open ? 'green.200' : 'purple.200'
  }, [status])

  return [updatedText, statusText, statusColor] as const
}
