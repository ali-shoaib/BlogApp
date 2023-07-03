import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name:"",
  email: "",
  username: "",
  createdAt:"",
  auth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, email, username, auth, name, createdAt } = action.payload;

      state._id = _id;
      state.name = name;
      state.createdAt = createdAt;
      state.email = email;
      state.username = username;
      state.auth = auth;
    },
    resetUser: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.username = "";
      state.createdAt = "";
      state.auth = false;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;