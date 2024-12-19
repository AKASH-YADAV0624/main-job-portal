import { createSlice } from "@reduxjs/toolkit";

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    bookmarks: [],
  },
  reducers: {
    addBookmark: (state, action) => {
      state.bookmarks.push(action.payload);
    },
    editBookmark: (state, action) => {
      const { id, message } = action.payload;
      const bookmark = state.bookmarks.find((job) => job._id === id);
      if (bookmark) bookmark.message = message;
    },
    removeBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        (job) => job._id !== action.payload
      );
    },
  },
});

export const { addBookmark, editBookmark, removeBookmark } =
  bookmarkSlice.actions;
export default bookmarkSlice.reducer;
