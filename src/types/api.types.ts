export interface ErrorResponse {
  error: {
    message: string
  }
}

export const PostStatus = {
  open: 0,
  closed: 1,
} as const
