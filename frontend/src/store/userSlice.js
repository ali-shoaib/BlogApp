import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name:"",
  email: "",
  username: "",
  createdAt:"",
  auth: false,
  gender:""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, email, username, auth, name, createdAt, gender } = action.payload;

      state._id = _id;
      state.name = name;
      state.createdAt = createdAt;
      state.email = email;
      state.username = username;
      state.auth = auth;
      state.gender = gender
    },
    resetUser: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.username = "";
      state.createdAt = "";
      state.auth = false;
      state.gender = "";
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;