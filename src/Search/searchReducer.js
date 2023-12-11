import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  searchCategory: "ThemeSongs",
  searchResults: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchCategory: (state, action) => {
      state.searchCategory = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setSearchCategory, setSearchQuery, setSearchResults } =
  searchSlice.actions;
export default searchSlice.reducer;
