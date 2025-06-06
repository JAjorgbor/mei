import axiosInstance from '@/api-utils/admin/request-adapter'

// Get all books
export const getAllBooks = async () => axiosInstance.get('/book/get')

// Create a book
export const createBook = async (data: any) =>
  axiosInstance.post('/book/create', data)
