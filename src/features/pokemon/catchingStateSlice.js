import { createSlice } from '@reduxjs/toolkit'

export const catchingStateSlice = createSlice({
  name: 'catchingState',
  initialState: {
    value: false,
  },
  reducers: {
    catching: (state) => {
      state.value = true
    },
    notCatching: (state) => {
        state.value = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { catching, notCatching } = catchingStateSlice.actions

export default catchingStateSlice.reducer