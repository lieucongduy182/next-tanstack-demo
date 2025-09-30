'use client'

import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { todosApi } from '@/app/lib/api/todos'
import { CreateTodoInput, Todo } from '@/app/types/todo'
import Loading from '../_components/Loading'
import ErrorMessage from '../_components/ErrorMessage'
import Link from 'next/link'
import ConceptCard from '../_components/ConceptCard'
import ComparisonDemo from './ComparisonDemo'
import OptimisticLikes from './OptimisticLikes'
import OptimisticTodoList from './OptimisticTodoList'

export default function OptimisticUpdatesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-orange-600 hover:text-orange-700 mb-4 inline-flex items-center"
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
            ⚡ Optimistic Updates
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Instant UI updates with automatic rollback on errors
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Section 1: Optimistic Todos */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. Optimistic Todo List
            </h2>
            <ConceptCard
              title="Key Concepts"
              items={[
                'onMutate: Update cache immediately',
                'context: Store rollback data',
                'onError: Rollback on failure',
                'onSettled: Cleanup and refetch',
                'Instant UI feedback',
              ]}
            />
            <OptimisticTodoList />
          </section>

          {/* Section 2: Optimistic Likes */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Optimistic Likes
            </h2>
            <ConceptCard
              title="Pattern Benefits"
              items={[
                'No waiting for server response',
                'Better perceived performance',
                'Automatic error handling',
                'Seamless rollback',
                'User confidence boost',
              ]}
            />
            <OptimisticLikes />
          </section>

          {/* Section 3: With/Without Comparison */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. Comparison: With vs Without Optimistic Updates
            </h2>
            <ComparisonDemo />
          </section>
        </div>
      </div>
    </main>
  )
}
