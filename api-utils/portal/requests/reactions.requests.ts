import axiosInstance from '@/api-utils/portal/request-adapter'
import { IReactionPayload } from '@/api-utils/global-interfaces/reactions.interface'

export const createReaction = (data: IReactionPayload) =>
  axiosInstance.post('/reactions/', data)
