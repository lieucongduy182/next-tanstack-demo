import { User } from '@/app/types/user'

const usersDB: User[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: '👩‍💻',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: '👨‍💼',
  },
  {
    id: 3,
    name: 'Carol White',
    email: 'carol@example.com',
    avatar: '👩‍🎨',
  },
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    await delay(800)
    return [...usersDB]
  },

  getUserById: async (id: number): Promise<User> => {
    await delay(500)
    const user = usersDB.find((u) => u.id === id)
    if (!user) throw new Error(`User with id ${id} not found`)
    return user
  },
}
