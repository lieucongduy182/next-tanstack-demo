import { User } from '@/app/types/user'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    const res = await fetch(`${API_URL}/users`)
    if (!res.ok) {
      throw new Error('Failed to fetch users')
    }

    return res.json()
  },

  getUserById: async (id: number): Promise<User> => {
    const res = await fetch(`${API_URL}/users/${id}`)
    if (!res.ok) throw new Error(`User with id ${id} not found`)
    return res.json()
  },
}
