import { postsApi } from '@/app/lib/api/posts'
import { useQuery } from '@tanstack/react-query'

export default function QueryStatesDemo() {
  const { data, isLoading, isFetching, isError, isSuccess, refetch } = useQuery(
    { queryKey: ['posts-states'], queryFn: postsApi.getPosts },
  )
  const states = [
    { label: 'isLoading', value: isLoading, color: 'blue' },
    { label: 'isFetching', value: isFetching, color: 'purple' },
    { label: 'isError', value: isError, color: 'red' },
    { label: 'isSuccess', value: isSuccess, color: 'green' },
  ]

  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {states.map((state) => (
          <div
            key={state.label}
            className={`p-3 rounded-lg border-2 ${
              state.value
                ? `bg-${state.color}-50 border-${state.color}-400 dark:bg-${state.color}-900/20 dark:border-${state.color}-500`
                : 'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600'
            }`}
          >
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {state.label}
            </div>
            <div
              className={`text-lg font-bold ${
                state.value
                  ? `text-${state.color}-600 dark:text-${state.color}-400`
                  : 'text-gray-400'
              }`}
            >
              {state.value ? 'true' : 'false'}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => refetch()}
        className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
      >
        Trigger Refetch
      </button>
      {data && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Loaded {data.length} posts
        </p>
      )}
    </div>
  )
}
