import Loading from '@/app/_components/Loading'
import { postsApi } from '@/app/lib/api/posts'
import { useQuery } from '@tanstack/react-query'

export default function PaginationDemo({
  page,
  setPage,
}: {
  page: number
  setPage: (page: number) => void
}) {
  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => postsApi.getPaginatedPosts(page, 3),
    placeholderData: (previousData) => previousData,
  })

  return (
    <div className="mt-4 space-y-4">
      {isLoading && !data ? (
        <Loading />
      ) : (
        <>
          <div
            className={`space-y-2 transition-opacity ${
              isPlaceholderData ? 'opacity-50' : 'opacity-100'
            }`}
          >
            {data?.posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3"
              >
                <div className="font-medium text-gray-900 dark:text-white text-sm">
                  {post.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  ❤️ {post.likes} likes
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {page} of {Math.ceil((data?.total || 0) / 3)}
              {isPlaceholderData && ' (loading...)'}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={!data?.hasMore}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}
