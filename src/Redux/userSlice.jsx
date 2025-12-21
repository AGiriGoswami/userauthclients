import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
  },
  reducers: {
    setauthUser: (state, action) => {
      state.authUser = action.payload;
    },
     userlogout: (state) => {
      state.authUser = null
     }
  },
});

export const {setauthUser, userlogout} = userSlice.actions
export default userSlice.reducer