import Loading from '@/app/_components/Loading'
import { postsApi } from '@/app/lib/api/posts'
import { usersApi } from '@/app/lib/api/users'
import { useQuery } from '@tanstack/react-query'

export default function DependentQueryDemo({
  userId,
}: {
  userId: number | null
}) {
  const userQuery = useQuery({
    queryKey: ['user-posts', userId],
    queryFn: async () => usersApi.getUserById(userId!),
    enabled: !!userId,
  })

  const postsQuery = useQuery({
    queryKey: ['dependent-posts', userId],
    queryFn: async () => {
      const posts = await postsApi.getPosts()
      return posts.filter((post) => post.userId === Number(userId))
    },
    enabled: !!userQuery.data,
  })

  if (!userId) {
    return (
      <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          ← Select a user first
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* User info */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
        <div className="flex items-center gap-3">
          {userQuery.isLoading ? (
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse"></div>
          ) : (
            <div className="text-4xl">{userQuery.data?.avatar}</div>
          )}
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {userQuery.isLoading ? 'Loading user...' : userQuery.data?.name}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {userQuery.data?.email}
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          User's Posts
        </h4>
        {postsQuery.isLoading ? (
          <Loading />
        ) : (
          <div className="space-y-2">
            {postsQuery.data?.map((post) => (
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
            {postsQuery.data?.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No posts found
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
