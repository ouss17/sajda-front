import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    csrf: "",
  },
};

export const csrfSlice = createSlice({
  name: "csrfReducer",

  initialState,
  reducers: {
    addCsrf: (state, action) => {
      state.value = {
        csrf: action.payload.csrf,
      };
    },
    removeCsrf: (state, action) => {
      state.value = {
        csrf: "",
      };
    },
  },
});

export const { addCsrf, removeCsrf } = csrfSlice.actions;
export default csrfSlice.reducer;