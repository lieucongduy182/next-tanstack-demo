'use client'

import Loading from '@/app/_components/Loading'
import { postsApi } from '@/app/lib/api/posts'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

export default function InfinitePostsList() {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['posts-infinite'],
    queryFn: postsApi.getInfinitePosts,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  })

  const observerRef = useRef<IntersectionObserver | null>(null)
  const lastPostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isFetchingNextPage) return

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })

    if (lastPostRef.current) {
      observerRef.current.observe(lastPostRef.current)
    }

    return () => observerRef.current?.disconnect()
  }, [hasNextPage, isFetchingNextPage])

  if (isLoading) {
    return [1, 2, 3].map((i) => <Loading key={i} />)
  }

  if (isError) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 text-center">
        <p className="text-red-700 dark:text-red-300">Error loading posts</p>
      </div>
    )
  }

  const allPosts = data?.pages.flatMap((page) => page.posts) || []

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-700">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          📊 Loaded {allPosts.length} posts
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {data?.pages.length} pages
        </span>
      </div>

      {/* Posts List */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {allPosts.map((post, index) => {
          const isLast = index === allPosts.length - 1
          return (
            <div
              key={`${post.id}-${index}`}
              ref={isLast ? lastPostRef : null}
              className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {post.title}
                </h3>
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                  #{post.id}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                {post.body}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span>❤️ {post.likes} likes</span>
                <span>👤 User {post.userId}</span>
              </div>
            </div>
          )
        })}

        {/* Loading Indicator */}
        {isFetchingNextPage && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
              Loading more posts...
            </p>
          </div>
        )}

        {/* End of List */}
        {!hasNextPage && (
          <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              🎉 You've reached the end!
            </p>
          </div>
        )}
      </div>

      {/* Manual Load More Button */}
      {hasNextPage && !isFetchingNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
        >
          Load More Posts
        </button>
      )}
    </div>
  )
}
