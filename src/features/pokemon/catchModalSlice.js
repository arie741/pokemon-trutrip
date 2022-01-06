import { createSlice } from '@reduxjs/toolkit'

export const catchModalSlice = createSlice({
  name: 'catchModal',
  initialState: {
    value: false,
  },
  reducers: {
    open: (state) => {
      state.value = true
    },
    close: (state) => {
        state.value = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { open, close } = catchModalSlice.actions

export default catchModalSlice.reducer