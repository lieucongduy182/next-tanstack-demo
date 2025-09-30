import { postsApi } from '@/app/lib/api/posts'
import { Post } from '@/app/types/post'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function OptimisticLikes() {
  const queryClient = useQueryClient()
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts-likes'],
    queryFn: postsApi.getPosts,
  })

  const likeMutation = useMutation({
    mutationFn: postsApi.likePost,
    onMutate: async function name(postId) {
      await queryClient.cancelQueries({ queryKey: ['posts-likes'] })
      const previous = queryClient.getQueryData(['posts-likes'])

      queryClient.setQueryData(['posts-likes'], (old: Post[] = []) =>
        old.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post,
        ),
      )

      return { previous }
    },
    onError: (data, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['posts-likes'], context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts-likes'] })
    },
  })

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Loading posts...
      </div>
    )
  }

  return (
    <div className="mt-4 space-y-4">
      {posts?.slice(0, 4).map((post) => (
        <div
          key={post.id}
          className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-all"
        >
          <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-2">
            {post.title}
          </h4>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ❤️ {post.likes} likes
            </span>
            <button
              onClick={() => likeMutation.mutate(post.id)}
              disabled={likeMutation.isPending}
              className="px-3 py-1 bg-pink-500 text-white text-sm rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
            >
              ❤️ Like
            </button>
          </div>
        </div>
      ))}
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-3 text-sm text-orange-700 dark:text-orange-300">
        💡 Notice how likes update instantly! No waiting for the server.
      </div>
    </div>
  )
}
