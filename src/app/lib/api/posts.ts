import { CreatePostInput, Post, UpdatePostInput } from '@/app/types/post'
import { generatePostRecords } from '../generateRecords'

const postsDB: Post[] = generatePostRecords()

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const postsApi = {
  getPosts: async (): Promise<Post[]> => {
    await delay(1000)
    return [...postsDB]
  },

  getPaginatedPosts: async (
    page: number = 1,
    limit: number = 2,
  ): Promise<{ posts: Post[]; hasMore: boolean; total: number }> => {
    await delay(800)
    const start = (page - 1) * limit
    const end = start + limit
    const posts = postsDB.slice(start, end)

    return { posts, hasMore: end < postsDB.length, total: postsDB.length }
  },

  // Get infinite posts (for infinite query)
  getInfinitePosts: async ({
    pageParam = 0,
  }: {
    pageParam?: number
  }): Promise<{ posts: Post[]; nextCursor: number | undefined }> => {
    await delay(1000)
    const limit = 3
    const start = pageParam * limit
    const end = start + limit
    const posts = postsDB.slice(start, end)

    return {
      posts,
      nextCursor: end < postsDB.length ? pageParam + 1 : undefined,
    }
  },

  getPostById: async (id: number): Promise<Post> => {
    await delay(600)
    const post = postsDB.find((p) => p.id === id)
    if (!post) throw new Error(`Post with id ${id} not found`)
    return post
  },

  createPost: async (input: CreatePostInput): Promise<Post> => {
    await delay(800)

    const newPost: Post = {
      id: Math.max(...postsDB.map((p) => p.id)) + 1,
      ...input,
      likes: 0,
      createdAt: new Date().toISOString(),
    }

    postsDB.push(newPost)

    return newPost
  },

  updatePost: async (input: UpdatePostInput): Promise<Post> => {
    await delay(800)

    const index = postsDB.findIndex((p) => p.id === input.id)
    if (index === -1) throw new Error(`Post with id ${input.id} not found`)
    postsDB[index] = { ...postsDB[index], ...input }

    return postsDB[index]
  },

  deletePost: async (id: number): Promise<void> => {
    await delay(600)

    const index = postsDB.findIndex((p) => p.id === id)
    if (index === -1) throw new Error(`Post with id ${id} not found`)
    postsDB.splice(index, 1)
  },

  likePost: async (id: number): Promise<Post> => {
    await delay(500)
    const index = postsDB.findIndex((p) => p.id === id)
    if (index === -1) throw new Error(`Post with id ${id} not found`)
    postsDB[index].likes += 1

    return postsDB[index]
  },

  unlikePost: async (id: number): Promise<Post> => {
    await delay(400)
    const index = postsDB.findIndex((p) => p.id === id)
    if (index === -1) throw new Error(`Post with id ${id} not found`)
    postsDB[index].likes = Math.max(0, postsDB[index].likes - 1)

    return postsDB[index]
  },
}
