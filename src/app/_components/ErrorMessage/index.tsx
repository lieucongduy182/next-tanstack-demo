export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
      <p className="text-red-700 dark:text-red-300">Error: {message}</p>
    </div>
  )
}
