import { useQueries } from '@tanstack/react-query'
import QueryStatus from '../QueryStatus'
import { postsApi } from '@/app/lib/api/posts'
import { usersApi } from '@/app/lib/api/users'

export default function ParallelQueriesDemo() {
  const queries = useQueries({
    queries: [
      {
        queryKey: ['posts-parallel'],
        queryFn: postsApi.getPosts,
      },
      {
        queryKey: ['users-parallel'],
        queryFn: usersApi.getUsers,
      },
    ],
  })

  const [postsQuery, usersQuery] = queries
  const allLoading = postsQuery.isLoading || usersQuery.isLoading
  const allSuccess = postsQuery.isSuccess && usersQuery.isSuccess

  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <QueryStatus label="Posts Query" query={postsQuery} />
        <QueryStatus label="Users Query" query={usersQuery} />
      </div>

      {allLoading && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Loading both queries in parallel...
          </p>
        </div>
      )}

      {allSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <p className="text-green-700 dark:text-green-300 text-sm font-medium mb-2">
            ✓ Both loaded!
          </p>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            <div>Posts: {postsQuery.data?.length}</div>
            <div>Users: {usersQuery.data?.length}</div>
          </div>
        </div>
      )}
    </div>
  )
}
