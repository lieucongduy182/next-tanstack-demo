export interface Todo {
  id: number
  title: string
  completed: boolean
  userId: number
}

export interface CreateTodoInput {
  title: string
  userId: number
}

export interface UpdateTodoInput {
  id: number
  title?: string
  completed?: boolean
}
