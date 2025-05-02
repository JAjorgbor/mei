import { CurrencyState } from '@/features/interfaces'
import { createSlice } from '@reduxjs/toolkit'

const initialState: CurrencyState = {
  currency: 'ngn',
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCurrency } = currencySlice.actions

export default currencySlice.reducer
