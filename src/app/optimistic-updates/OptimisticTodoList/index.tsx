import { todosApi } from '@/app/lib/api/todos'
import { queryClient } from '@/app/lib/queryClient'
import { Todo } from '@/app/types/todo'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function OptimisticTodoList() {
  const [newTodoTitle, setNewTodoTitle] = useState('')

  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: todosApi.getTodos,
  })

  const addTodoMutation = useMutation({
    mutationFn: todosApi.createTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

      queryClient.setQueryData(['todos'], (old: Todo[] = []) => [
        ...old,
        { id: Date.now(), title: newTodo.title, completed: false } as Todo,
      ])

      return { previousTodos }
    },
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const deleteTodoMutation = useMutation({
    mutationFn: todosApi.deleteTodo,
    onMutate: async (todoId) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

      queryClient.setQueryData(['todos'], (old: Todo[] = []) =>
        old.filter((todo) => todo.id !== todoId),
      )

      return { previousTodos }
    },
    onError(error, variables, context) {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const toggleTodoMutation = useMutation({
    mutationFn: todosApi.toggleTodo,
    onMutate: async (todoId) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

      queryClient.setQueryData(['todos'], (old: Todo[] = []) =>
        old.map((todo) =>
          todo.id === todoId
            ? {
                ...todo,
                completed: !todo.completed,
              }
            : todo,
        ),
      )

      return { previousTodos }
    },
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodoTitle.trim()) return

    const newTodo = { title: newTodoTitle.trim(), userId: 1 }
    addTodoMutation.mutate(newTodo)
    setNewTodoTitle('')
  }

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Loading todos...
      </div>
    )
  }

  return (
    <div className="mt-4 space-y-4">
      <form onSubmit={handleAddTodo} className="flex gap-2">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          disabled={!newTodoTitle.trim()}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </form>

      {/* Todo List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {todos?.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 group hover:shadow-md transition-all"
          >
            <button
              onClick={() => toggleTodoMutation.mutate(todo.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all
            ${
              todo.completed
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
            }`}
            >
              {todo.completed && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
            <span
              className={`flex-1 text-sm ${
                todo.completed
                  ? 'line-through text-gray-400 dark:text-gray-500'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodoMutation.mutate(todo.id)}
              className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}

        {/* Stats */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex justify-between">
            <span>{todos?.filter((t) => !t.completed).length} active</span>
            <span>{todos?.filter((t) => t.completed).length} completed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
