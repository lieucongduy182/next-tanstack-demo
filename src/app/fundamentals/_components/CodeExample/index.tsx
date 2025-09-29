export default function CodeExample({
  title,
  code,
}: {
  title: string
  code: string
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-xs">
        <code>{code}</code>
      </pre>
    </div>
  )
}
