import { createSlice } from '@reduxjs/toolkit'
import type { SidebarState } from '@/features/interfaces'

const initialState: SidebarState = {
  openSidebar: false,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setOpenSidebar: (state, action) => {
      state.openSidebar = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setOpenSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer
