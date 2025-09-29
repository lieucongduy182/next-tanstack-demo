import Loading from '@/app/_components/Loading'
import { postsApi } from '@/app/lib/api/posts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function PostDetail({ postId }: { postId: number | null }) {
  const queryClient = useQueryClient()

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => postsApi.getPostById(postId!),
    enabled: !!postId,
  })

  const likeMutation = useMutation({
    mutationFn: postsApi.likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['post', postId] })
    },
  })

  const unlikeMutation = useMutation({
    mutationFn: postsApi.unlikePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['post', postId] })
    },
  })

  if (!postId) {
    return (
      <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          Select a post to view details
        </p>
      </div>
    )
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
        {post?.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
        {post?.body}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-gray-600 dark:text-gray-400">
          ❤️ {post?.likes} likes
        </span>
        <div className="flex item-center gap-2">
          <button
            onClick={() => likeMutation.mutate(postId)}
            disabled={likeMutation.isPending}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
          >
            {likeMutation.isPending ? 'Liking...' : '❤️ Like'}
          </button>

          <button
            onClick={() => unlikeMutation.mutate(postId)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            {unlikeMutation.isPending ? (
              'Unliking...'
            ) : (
              <span className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50">
                💔 Unlike
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
