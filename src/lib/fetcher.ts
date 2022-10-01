import { ErrorResponse } from 'src/types/api.types'

export const fetcher = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const { error } = (await res.json()) as ErrorResponse
    throw new Error(error.message)
  }

  return res.json()
}
