import axios from 'axios'

export const runtime = 'edge'

export const loginAdmin = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (data.email.includes('example.com')) {
        resolve({
          id: 1,
          name: 'Joshua Ajorgbor',
          email: 'joshua@example.com',
          role: 'admin',
        })
      } else resolve(false)
    }, 500)
  })
}
