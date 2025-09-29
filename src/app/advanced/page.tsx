'use client'

import { useState } from 'react'
import Link from 'next/link'
import ConceptCard from '../_components/ConceptCard'
import DependentQueryDemo from './_components/DependentQueryDemo'
import PaginationDemo from './_components/PaginationDemo'
import ParallelQueriesDemo from './_components/ParallelQueriesDemo'

export default function AdvancedPage() {
  const userIds = [1, 2, 3]
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-purple-600 hover:text-purple-700 mb-4 inline-flex items-center"
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
            🚀 Advanced Concepts
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Parallel queries, dependent queries, and pagination patterns
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Section 1: Parallel Queries */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. Parallel Queries
            </h2>
            <ConceptCard
              title="useQueries Hook"
              items={[
                'Fetch multiple queries in parallel',
                'Returns array of query results',
                'All queries run independently',
                'Useful for dynamic query lists',
                'Better performance than sequential',
              ]}
            />
            <ParallelQueriesDemo />
          </section>

          {/* Section 2: Pagination */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Pagination
            </h2>
            <ConceptCard
              title="placeholderData Option"
              items={[
                'Show previous data while loading',
                'Smooth pagination experience',
                'No loading flicker',
                'keepPreviousData deprecated in v5',
                'Use placeholderData instead',
              ]}
            />
            <PaginationDemo page={currentPage} setPage={setCurrentPage} />
          </section>

          {/* Section 3: Dependent Queries */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. Dependent Queries
            </h2>
            <ConceptCard
              title="Enabled Option"
              items={[
                'enabled: Controls when query runs',
                'Perfect for dependent data',
                'Wait for prerequisite data',
                'Prevents unnecessary requests',
                'Chain multiple queries',
              ]}
            />
            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Select a user to load their posts:
              </p>
              <div className="space-y-2">
                {userIds.map((id) => (
                  <button
                    key={id}
                    onClick={() => setSelectedUserId(id)}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                      selectedUserId === id
                        ? 'bg-purple-50 border-purple-400 dark:bg-purple-900/20 dark:border-purple-500'
                        : 'bg-white border-gray-200 hover:border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                    }`}
                  >
                    User {id}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4: Dependent Demo */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Dependent Query Demo
            </h2>
            <DependentQueryDemo userId={selectedUserId} />
          </section>
        </div>
      </div>
    </main>
  )
}
