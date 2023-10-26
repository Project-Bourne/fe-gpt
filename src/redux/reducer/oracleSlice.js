import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const oracleSlice = createSlice({
  name: 'Oracle',
  initialState: {
    history: null,
    bookmark: []
  },
  reducers: {
    setBookmark: state => {
      state.bookmark = state.history.filter(el => el.bookmark);
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    updatePagination: (state, action) => {
      state.history = {
        ...state.history,
        ...action.payload
      };
    }
  }
});

export const { setBookmark, setHistory, updatePagination } =
  oracleSlice.actions;

export default oracleSlice.reducer;
