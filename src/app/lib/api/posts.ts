import { CreatePostInput, Post, UpdatePostInput } from '@/app/types/post'

let postsDB: Post[] = [
  {
    id: 1,
    title: 'Getting Started with TanStack Query',
    body: 'TanStack Query is a powerful data synchronization library for React...',
    userId: 1,
    likes: 42,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Advanced React Patterns',
    body: 'Learn about compound components, render props, and custom hooks...',
    userId: 2,
    likes: 38,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'TypeScript Best Practices',
    body: 'Type safety is crucial for large-scale applications...',
    userId: 1,
    likes: 51,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'Next.js App Router Guide',
    body: 'The new App Router brings server components and streaming...',
    userId: 3,
    likes: 67,
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: 'Building Scalable APIs',
    body: 'REST vs GraphQL: choosing the right API architecture...',
    userId: 2,
    likes: 29,
    createdAt: new Date().toISOString(),
  },
]

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
  }): Promise<{ posts: Post[]; nextPage: number | undefined }> => {
    await delay(1000)
    const limit = 3
    const start = pageParam * limit
    const end = start + limit
    const posts = postsDB.slice(start, end)

    return {
      posts,
      nextPage: end < postsDB.length ? pageParam + 1 : undefined,
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

    postsDB = [...postsDB, newPost]

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
