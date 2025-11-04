export interface IUser {
  userId: string
  status: null
  email: string
  firstName: string
  lastName: string
  avatar: null
  accessToken: null
  refreshToken: null
  balance: number
  unlockedChapters: string[]
  dateCreated: Date
  stage: { currentStage: number; currentExperience: number }
}
