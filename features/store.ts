import currencySlice from '@/features/currencySlice'
import headerSlice from '@/features/headerSlice'
import sidebarSlice from '@/features/sidebarSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const rootReducer = combineReducers({
  sidebar: sidebarSlice,
  header: headerSlice,
  currency: currencySlice,
})

const loadState = () => {
  try {
    if (typeof window !== 'undefined') {
      const serializedState = localStorage.getItem('website-state') as string
      if (serializedState === null) {
        return undefined
      }
      const state = JSON.parse(serializedState)

      // Ensure only known keys are included
      const allowedKeys = ['sidebar', 'header', 'currency']
      const filteredState = Object.keys(state)
        .filter((key) => allowedKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = state[key]
          return obj
        }, {} as any)

      return filteredState
    }
  } catch (error) {
    console.error('Error loading state from localStorage:', error)
  }
  return undefined
}

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('website-state', serializedState)
  } catch (error) {
    console.error('Error saving state to local storage:', error)
  }
}

const preloadedState = loadState()

export const store = configureStore({
  preloadedState,
  reducer: rootReducer,
})

store.subscribe(() => {
  saveState(store.getState())
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector
