export interface Post {
  id: number
  title: string
  body: string
  userId: number
  likes: number
  createdAt: string
}

export interface CreatePostInput {
  title: string
  body: string
  userId: number
}

export interface UpdatePostInput {
  id: number
  title?: string
  body?: string
  likes?: number
}
