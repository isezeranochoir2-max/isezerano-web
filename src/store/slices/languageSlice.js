import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  language: 'kin',
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload
    },
    toggleLanguage: (state) => {
      state.language = state.language === 'kin' ? 'en' : 'kin'
    },
  },
})

export const { setLanguage, toggleLanguage } = languageSlice.actions
export default languageSlice.reducer
