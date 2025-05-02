import { createSlice } from '@reduxjs/toolkit'
import type { HeaderState } from '@/features/interfaces'

const initialState: HeaderState = {
  theme: 'system',
}

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTheme } = headerSlice.actions

export default headerSlice.reducer
