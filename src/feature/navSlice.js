import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: "",
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    ADD_TO_USERDATA: (state, action) => {
      state.userData = action.payload
    },

  },
});

export const {
  ADD_TO_USERDATA,
} = navSlice.actions;


export const selectUserdata = (state) => state.nav.userData;


export default navSlice.reducer;
