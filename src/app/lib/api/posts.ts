import { CreatePostInput, Post, UpdatePostInput } from '@/app/types/post'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const postsApi = {
  getPosts: async (): Promise<Post[]> => {
    const res = await fetch(`${API_URL}/posts`)
    if (!res.ok) {
      throw new Error('Failed to fetch posts')
    }

    return res.json()
  },

  getPaginatedPosts: async (
    page: number = 1,
    limit: number = 2,
  ): Promise<{ posts: Post[]; hasMore: boolean; total: number }> => {
    const res = await fetch(`${API_URL}/posts?page=${page}&limit=${limit}`)
    if (!res.ok) {
      throw new Error('Failed to fetch posts')
    }

    const { posts, total, hasMore } = await res.json()
    return { posts, hasMore, total }
  },

  getInfinitePosts: async ({
    pageParam = 0,
  }: {
    pageParam?: number
  }): Promise<{ posts: Post[]; nextCursor: number | undefined }> => {
    const res = await fetch(`${API_URL}/posts/infinite?pageParam=${pageParam}`)
    if (!res.ok) {
      throw new Error('Failed to fetch posts')
    }

    await delay(1000)

    const { posts, nextCursor } = await res.json()
    return { posts, nextCursor }
  },

  getPostById: async (id: number): Promise<Post> => {
    const res = await fetch(`${API_URL}/posts/${id}`)
    if (!res.ok) throw new Error(`Post with id ${id} not found`)
    return res.json()
  },

  createPost: async (input: CreatePostInput): Promise<Post> => {
    const res = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    if (!res.ok) throw new Error('Failed to create post')

    return res.json()
  },

  updatePost: async (input: UpdatePostInput): Promise<Post> => {
    const res = await fetch(`${API_URL}/posts/${input.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    if (!res.ok) throw new Error(`Failed to update post with id ${input.id}`)

    return res.json()
  },

  deletePost: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error(`Failed to delete post with id ${id}`)
  },

  likePost: async (id: number): Promise<Post> => {
    const res = await fetch(`${API_URL}/posts/${id}/like`, {
      method: 'POST',
    })
    if (!res.ok) throw new Error(`Failed to like post with id ${id}`)

    return res.json()
  },

  unlikePost: async (id: number): Promise<Post> => {
    const res = await fetch(`${API_URL}/posts/${id}/unlike`, {
      method: 'POST',
    })
    if (!res.ok) throw new Error(`Failed to unlike post with id ${id}`)

    return res.json()
  },
}
