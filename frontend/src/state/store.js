import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './admin/auth.admin.slice'
export const store = configureStore({
  reducer: {
    admin: adminReducer
  },
})