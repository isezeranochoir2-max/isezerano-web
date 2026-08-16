import { configureStore } from '@reduxjs/toolkit'
import contentReducer from './slices/contentSlice'
import languageReducer from './slices/languageSlice'
import themeReducer from './slices/themeSlice'

export const store = configureStore({
  reducer: {
    content: contentReducer,
    language: languageReducer,
    theme: themeReducer,
  },
})
