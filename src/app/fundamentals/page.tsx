'use client'

import Link from 'next/link'
import ConceptCard from './_components/ConceptCard'
import PostsList from './_components/PostsList'
import QueryStatesDemo from './_components/QueryStatesDemo'
import { useState } from 'react'
import PostDetail from './_components/PostDetail'

export default function FundamentalsPage() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>()

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 mb-4 inline-flex items-center"
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
            📚 Fundamentals
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Master useQuery, useMutation, and cache management basics
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Section 1: Basic useQuery */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. Basic useQuery
            </h2>
            <ConceptCard
              title="Key Concepts"
              items={[
                'queryKey: Unique identifier for caching',
                'queryFn: Async function that fetches data',
                'isLoading: True on first load',
                'isError: Error state',
                'data: The fetched data',
                'refetch: Manually trigger refetch',
              ]}
            />
            <PostsList />
          </section>

          {/* Section 2: Query States */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Query States
            </h2>
            <ConceptCard
              title="Query Lifecycle"
              items={[
                'isLoading: No data, first fetch',
                'isFetching: Background refetch',
                'isError: Request failed',
                'isSuccess: Data available',
                'isPaused: Network offline',
              ]}
            />
            <QueryStatesDemo />
          </section>

          {/* Section 3: Mutations */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. useMutation
            </h2>
            <ConceptCard
              title="Mutation Concepts"
              items={[
                'mutationFn: Function for POST/PUT/DELETE',
                'onSuccess: Callback after success',
                'onError: Handle errors',
                'invalidateQueries: Refetch related data',
                'isPending: Mutation in progress',
              ]}
            />
            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Select a post to interact with:
              </p>
              <div className="space-y-2">
                {[1, 2, 3].map((id) => (
                  <button
                    key={id}
                    onClick={() => setSelectedPostId(id)}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                      selectedPostId === id
                        ? 'bg-blue-50 border-blue-400 dark:bg-blue-900/20 dark:border-blue-500'
                        : 'bg-white border-gray-200 hover:border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                    }`}
                  >
                    Post {id}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4: Mutation Demo*/}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Mutation Demo
            </h2>
            <PostDetail postId={selectedPostId!} />
          </section>
        </div>
      </div>
    </main>
  )
}
