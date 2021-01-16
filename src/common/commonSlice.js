import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
   name: "commonSlice",
   initialState: {
      theme: "lightTheme",
   },
   reducers: {
      changeTheme: (state, action) => {
         state.theme = action.payload;
      },
   },
});

export const { changeTheme } = commonSlice.actions;

export default commonSlice.reducer;
