import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    pseudo: "",
    email: "",
    role: "",
    id: "",
  },
};

export const userSlice = createSlice({
  name: "userReducer",

  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value = {
        pseudo: action.payload.pseudo,
        email: action.payload.email,
        role: action.payload.role,
        id: action.payload._id,
      };
    },
    removeUser: (state, action) => {
      state.value = {
        pseudo: "",
        email: "",
        role: "",
        id: "",
      };
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
