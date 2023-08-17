import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const oracleSlice = createSlice({
  name: "Oracle",
  initialState: {
    toggleEdit: false,
    toggleActionIcon: false,
  },
  reducers: {
    setToggleEdit: (state) => {
      state.toggleEdit = !state.toggleEdit;
    },
    settoggleActionIcon: (state) => {
      state.toggleActionIcon = !state.toggleActionIcon;
    },
  },
});

export const {
  setToggleEdit, settoggleActionIcon
  
} = oracleSlice.actions;

export default oracleSlice.reducer;