import { createSlice } from '@reduxjs/toolkit'

export const catchingResultSlice = createSlice({
  name: 'catchingResult',
  initialState: {
    value: [],
  },
  reducers: {
    success: (state, action) => {
        state.value = [true, action.payload];
    },
    fail: (state) => {
        state.value = [false, 0]
    },
    clear: (state) => {
        state.value = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { success, fail, clear } = catchingResultSlice.actions

export default catchingResultSlice.reducer