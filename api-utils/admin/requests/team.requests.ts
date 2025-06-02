import axiosInstance from '@/api-utils/admin/request-adapter'

// Invite team member
export const inviteTeamMember = async (data: any) =>
  axiosInstance.post(`admin/invite`, data)

// Accept invite
export const acceptInvite = async (data: any) =>
  axiosInstance.post(`admin/sign-up`, data)
