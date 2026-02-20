export interface IUser {
  userId: string
  status: null
  email: string
  firstName: string
  lastName: string
  avatar: null
  accessToken: null
  refreshToken: null
  bookmarks: string[]
  likes: string[]
  balance: number
  unlockedChapters: string[]
  dateCreated: Date
  stage: { currentStage: number; currentExperience: number }
  stopped_reading: {
    chapterId: string
    chapterNumber: number
    chapterSnippet: string
  }
}
