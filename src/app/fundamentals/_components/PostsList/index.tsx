import ErrorMessage from '@/app/_components/ErrorMessage'
import Loading from '@/app/_components/Loading'
import { postsApi } from '@/app/lib/api/posts'
import { useQuery } from '@tanstack/react-query'

export default function PostsList() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: postsApi.getPosts,
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ErrorMessage message={error.message} />
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Posts ({posts?.length})
        </h3>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 text-sm"
        >
          {isFetching ? 'Refetching...' : 'Refetch'}
        </button>
      </div>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {posts?.slice(0, 5).map((post) => (
          <div
            key={post.id}
            className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3"
          >
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
              {post.title}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              ❤️ {post.likes} likes
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
