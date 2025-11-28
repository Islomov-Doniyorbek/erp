import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createDog: false,
  docWin: false,
};

export const boolSlice = createSlice({
  name: "bools",
  initialState,
  reducers: {
    toggleCreateDog: (state) => {
      state.createDog = !state.createDog;
    },
    setCreateDog: (state, action) => {
      state.createDog = action.payload;
    },
    toggleDocWin: (state) => {
      state.docWin = !state.docWin;
    },
  },
});

export const {
  toggleCreateDog,
  setCreateDog,
  toggleDocWin
} = boolSlice.actions;

export default boolSlice.reducer;
