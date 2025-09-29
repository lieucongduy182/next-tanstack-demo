export default function ConceptCard({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-sm text-gray-700 dark:text-gray-300 flex items-start"
          >
            <span className="text-blue-500 mr-2">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
