export interface IReaction {
  emoji: string
  count: number
  key: string
}

export interface ICreateAuthorPost {
  content: string
  chapterNumber?: number
}
export interface IAuthorPost {
  text: string
  chapterId: string
  id: string
  dateCreated: Date
  lastUpdated: Date
  chapterSummary: ChapterSummary
  reactionSummary: Record<string, number>
  userReaction: string | null
}

export interface ChapterSummary {
  id: string
  bookId: string
  chapterLabel: string
  number: number
  accessType: null
  coverImage: string
  pageCount: number
  dateCreated: Date
  dateUpdated: Date
}
