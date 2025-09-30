import Link from 'next/link'
import ConceptCard from '../_components/ConceptCard'
import InfinitePostsList from './InfinitePostsList'

export default function InfiniteQueryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-green-600 hover:text-green-700 mb-4 inline-flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            ♾️ Infinite Queries
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Implement infinite scrolling with useInfiniteQuery
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Concepts */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              📚 Concepts
            </h2>
            <ConceptCard
              title="useInfiniteQuery"
              items={[
                'pageParam: Current page/cursor',
                'getNextPageParam: Calculate next page',
                'fetchNextPage: Load more data',
                'hasNextPage: Check if more data exists',
                'isFetchingNextPage: Loading state',
              ]}
            />
            <ConceptCard
              title="Patterns"
              items={[
                'Cursor-based pagination',
                'Offset-based pagination',
                'Intersection Observer',
                'Manual "Load More" button',
                'Infinite scroll',
              ]}
            />
          </section>

          {/* Infinite List Demo */}
          <section className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Live Demo: Infinite Scroll
            </h2>
            <InfinitePostsList />
          </section>
        </div>
      </div>
    </main>
  )
}
