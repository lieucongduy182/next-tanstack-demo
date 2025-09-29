export default function QueryStatus({
  label,
  query,
}: {
  label: string
  query: any
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
      <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </div>
      <div className="flex items-center gap-2">
        {query.isLoading && (
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        )}
        {query.isSuccess && (
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        )}
        {query.isError && (
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        )}
        <span className="text-xs text-gray-700 dark:text-gray-300">
          {query.isLoading && 'Loading...'}
          {query.isSuccess && 'Success'}
          {query.isError && 'Error'}
        </span>
      </div>
    </div>
  )
}
