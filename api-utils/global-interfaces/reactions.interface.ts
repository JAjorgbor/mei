export interface IReactionPayload {
  reaction: string
  authorRoomId: string
}

export interface IReactionResponse {
  reaction: string
  authorRoomId: string
  id: string
  dateCreated: string
  lastUpdated: string
}
