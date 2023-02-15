import { configureStore } from '@reduxjs/toolkit'
import positionSlice from '../store/positionSlice'
import userSlice from '../store/userSlice'
export const store = configureStore({
  reducer: {
    user:userSlice,
    position:positionSlice
  },
})