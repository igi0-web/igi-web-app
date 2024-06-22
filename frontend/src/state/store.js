import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './admin/admin.slice'
export const store = configureStore({
  reducer: {
    admin: adminReducer
  },
})