import { UpdateTodoInput } from './../../types/todo'
import { CreateTodoInput, Todo } from '@/app/types/todo'

let todosDB: Todo[] = [
  { id: 1, title: 'Learn TanStack Query', completed: true, userId: 1 },
  { id: 2, title: 'Build a Next.js app', completed: false, userId: 1 },
  { id: 3, title: 'Master TypeScript', completed: false, userId: 1 },
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const todosApi = {
  getTodos: async (): Promise<Todo[]> => {
    await delay(1000)
    return [...todosDB]
  },

  getTodoById: async (id: number): Promise<Todo> => {
    await delay(500)
    const todo = todosDB.find((t) => t.id === id)
    if (!todo) throw new Error(`Todo with id ${id} not found`)
    return todo
  },

  createTodo: async (input: CreateTodoInput): Promise<Todo> => {
    await delay(800)
    const newTodo: Todo = {
      id: Math.max(...todosDB.map((t) => t.id)) + 1,
      ...input,
      completed: false,
    }

    todosDB = [...todosDB, newTodo]

    return newTodo
  },

  updateTodo: async (input: UpdateTodoInput): Promise<Todo> => {
    await delay(800)
    const index = todosDB.findIndex((t) => t.id === input.id)
    if (index === -1) throw new Error(`Todo with id ${input.id} not found`)

    const updatedTodo = { ...todosDB[index], ...input }
    todosDB[index] = updatedTodo

    return updatedTodo
  },

  deleteTodo: async (id: number): Promise<void> => {
    await delay(400)
    const index = todosDB.findIndex((t) => t.id === id)
    if (index === -1) throw new Error(`Todo with id ${id} not found`)
    todosDB.splice(index, 1)
  },

  toggleTodo: async (id: number): Promise<Todo> => {
    await delay(400)
    const index = todosDB.findIndex((t) => t.id === id)
    if (index === -1) throw new Error(`Todo with id ${id} not found`)

    todosDB[index].completed = !todosDB[index].completed
    return todosDB[index]
  },
}
