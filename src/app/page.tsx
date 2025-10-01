import Link from 'next/link'

export default function Home() {
  const tutorials = [
    {
      title: 'Fundamentals',
      description: 'Learn useQuery, useMutation, and basic cache management',
      href: '/fundamentals',
      icon: '📚',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Advanced Concepts',
      description: 'Parallel queries, dependent queries, and pagination',
      href: '/advanced',
      icon: '🚀',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Optimistic Updates',
      description: 'Instant UI updates with automatic rollback on errors',
      href: '/optimistic-updates',
      icon: '⚡',
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Infinite Queries',
      description: 'Implement infinite scrolling with useInfiniteQuery',
      href: '/infinite-query',
      icon: '♾️',
      color: 'from-green-500 to-teal-500',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800:">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            TanStack Query Tutorial And Deploy App To Google Cloud
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Master data fetching, caching, and state management in React with
            comprehensive examples
          </p>
        </div>

        {/* Tutorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {tutorials.map((tutorial) => (
            <Link
              key={tutorial.href}
              href={tutorial.href}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${tutorial.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className="relative p-8">
                <div className="text-5xl mb-4">{tutorial.icon}</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {tutorial.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {tutorial.description}
                </p>
                <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium">
                  Start Learning
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            What You'll Learn
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Core Concepts
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Query keys, cache management, loading states, and error handling
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🔄</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Real-World Patterns
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Mutations, optimistic updates, and complex data flows
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">⚙️</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Best Practices
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                TypeScript integration, custom hooks, and performance
                optimization
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
