import { IUser } from '@/api-utils/global-interfaces/user.interfaces'

export interface ILike {
  chapterId: string
  likeType: string
  userId: string
  role: string
  id: string
  dateCreated: Date
  userDetails: IUser
}
