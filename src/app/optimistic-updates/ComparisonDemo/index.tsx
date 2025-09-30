import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export default function ComparisonDemo() {
  const queryClient = useQueryClient()
  const [count1, setCount1] = useState(42)
  const [count2, setCount2] = useState(42)
  const [loading1, setLoading1] = useState(false)

  const handleTraditional = async () => {
    setLoading1(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setCount1((c) => c + 1)
    setLoading1(false)
  }

  const handleOptimistic = () => {
    setCount2((c) => c + 1) // Update UI immediately
    setTimeout(() => {}, 1000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Without Optimistic */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border-2 border-gray-300 dark:border-gray-600">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">
          ❌ Without Optimistic Update
        </h3>
        <div className="text-center mb-4">
          <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
            {loading1 ? '...' : count1}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">likes</p>
        </div>
        <button
          onClick={handleTraditional}
          disabled={loading1}
          className="w-full px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
        >
          {loading1 ? 'Waiting for server...' : 'Like (1s delay)'}
        </button>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
          UI freezes while waiting
        </p>
      </div>

      {/* With Optimistic */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border-2 border-green-400 dark:border-green-600">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">
          ✅ With Optimistic Update
        </h3>
        <div className="text-center mb-4">
          <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
            {count2}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">likes</p>
        </div>
        <button
          onClick={handleOptimistic}
          className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Like (Instant!)
        </button>
        <p className="text-xs text-green-700 dark:text-green-300 mt-3 text-center font-medium">
          ⚡ Instant UI feedback
        </p>
      </div>
    </div>
  )
}
