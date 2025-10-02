import { UpdateTodoInput } from './../../types/todo'
import { CreateTodoInput, Todo } from '@/app/types/todo'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const todosApi = {
  getTodos: async (): Promise<Todo[]> => {
    const res = await fetch(`${API_URL}/todos`)
    if (!res.ok) {
      throw new Error('Failed to fetch todos')
    }

    return res.json()
  },

  getTodoById: async (id: number): Promise<Todo> => {
    const res = await fetch(`${API_URL}/todos/${id}`)
    if (!res.ok) throw new Error(`Todo with id ${id} not found`)
    return res.json()
  },

  createTodo: async (input: CreateTodoInput): Promise<Todo> => {
    const res = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    if (!res.ok) throw new Error('Failed to create todo')

    return res.json()
  },

  updateTodo: async (input: UpdateTodoInput): Promise<Todo> => {
    const res = await fetch(`${API_URL}/todos/${input.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    if (!res.ok) throw new Error(`Failed to update todo with id ${input.id}`)

    return res.json()
  },

  deleteTodo: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error(`Failed to delete todo with id ${id}`)
  },

  toggleTodo: async (id: number): Promise<Todo> => {
    const res = await fetch(`${API_URL}/todos/${id}/toggle`, {
      method: 'POST',
    })
    if (!res.ok) throw new Error(`Failed to toggle todo with id ${id}`)

    return res.json()
  },
}
