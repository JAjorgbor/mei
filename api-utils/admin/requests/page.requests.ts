import axiosInstance from '@/api-utils/admin/request-adapter'

export const addNewPage = async (bookId: string, data: any) =>
  axiosInstance.post(`/page/create/${bookId}`, data)

export const getPagesForChapter = async (chapterId: string) =>
  axiosInstance.get(`/page/get/${chapterId}`)

export const getPage = async (pageId: string) =>
  axiosInstance.get(`/page/get/page/${pageId}`)

export const updatePage = async (pageId: string, data: any) =>
  axiosInstance.patch(`/page/update/${pageId}`, data)

export const deletePage = async (pageId: string) =>
  axiosInstance.delete(`/page/delete/${pageId}`)
