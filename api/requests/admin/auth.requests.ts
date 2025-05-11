import axios from 'axios'

export const loginAdmin = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (data.email == 'joshua@example.com' && data.password == 'password') {
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
