import {
  FC,
  SyntheticEvent,
  useCallback,
  KeyboardEvent,
  useRef,
  useState,
  useMemo,
} from 'react'
import useSWR from 'swr'

export const useInputTag = (
  name: string,
  tags: string[],
  updateTags: (tags: string[]) => void
) => {
  const initialFocusRef = useRef()
  const [inputValue, setInputValue] = useState('')

  const handleRemoveTag = useCallback(
    (name: string) => (_event: SyntheticEvent) => {
      updateTags(tags.filter((tag) => tag !== name))
    },
    [tags, updateTags]
  )

  const handleChange = useCallback((event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    setInputValue(target.value)
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.isDefaultPrevented()) return
      if (event.isPropagationStopped()) return
      if (event.nativeEvent.isComposing) return

      const { currentTarget, key } = event
      if (key === 'Enter') {
        if (currentTarget.value !== '' && !tags.includes(currentTarget.value)) {
          updateTags([...tags, currentTarget.value])
        }
        if (!event.isDefaultPrevented()) {
          setInputValue('')
        }
        event.preventDefault()
      }
    },
    [tags, updateTags]
  )

  const handleClickBadge = useCallback(
    (tag: { id: number; name: string }) => {
      if (!tags.includes(name)) {
        updateTags([...tags, tag.name])
      }
    },
    [name, tags, updateTags]
  )

  const { data } = useSWR('/api/tag')

  const tagsFilteredByText = useMemo(() => {
    if (!data) return []
    return data.filter(
      (tag: { id: number; name: string }) =>
        tag.name.includes(inputValue) && !tags.includes(tag.name)
    )
  }, [data, inputValue, tags])

  return [
    initialFocusRef,
    handleRemoveTag,
    handleChange,
    handleKeyDown,
    handleClickBadge,
    inputValue,
    tagsFilteredByText,
  ] as const
}
