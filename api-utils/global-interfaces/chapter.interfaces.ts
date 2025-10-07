export interface IChapter {
  bookId: string
  chapterLabel: string
  status: string
  coverImage: string
  number: number
  id: string
  lastAccessed: Date
  dateCreated: Date
  dateUpdated: Date
  pageCount: number
  pages: any[]
  commentsCount: number
  likesCount: number
}
