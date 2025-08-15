import { createSlice } from '@reduxjs/toolkit'
import type { HeaderState } from '@/features/interfaces'

const initialState: HeaderState = {
  theme: 'system',
  fontSize: 'normal',
}

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload
    },
    setHeaderNavigation: (state, action) => {
      state.navigation = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTheme, setHeaderNavigation, setFontSize } =
  headerSlice.actions

export default headerSlice.reducer
