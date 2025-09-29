export default function Loading() {
  return (
    <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-blue-200 dark:bg-blue-700 rounded w-3/4"></div>
        <div className="h-4 bg-blue-200 dark:bg-blue-700 rounded w-1/2"></div>
      </div>
    </div>
  )
}
