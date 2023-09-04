import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const oracleSlice = createSlice({
  name: "Oracle",
  initialState: {
    history: [],
    bookmark: [],
  },
  reducers: {
    setBookmark: state => {
      state.bookmark = state.history.filter(el => el.bookmark);
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const {
  setBookmark, setHistory
  
} = oracleSlice.actions;

export default oracleSlice.reducer;