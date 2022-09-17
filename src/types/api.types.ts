export interface ErrorResponse {
  error: {
    message: string
  }
}

export const PostStatus = {
  open: 1,
  closed: 2,
} as const
