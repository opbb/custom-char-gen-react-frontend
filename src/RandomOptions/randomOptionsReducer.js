import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allRandomOptions: [],
  randomOptions: {
    ownerID: "",
    visibility: "private",
    title: "",
    description: "",
    type: "list",
    optionsList: [],
    start: 0,
    end: 0,
    step: 0,
  },
};

const randomOptionsSlice = createSlice({
  name: "randomOptions",
  initialState,
  reducers: {
    addRandomOptions: (state, action) => {
      state.allRandomOptions = [action.payload, ...state.allRandomOptions];
    },
    setRandomOptions: (state, action) => {
      state.allRandomOptions = action.payload;
    },
    setOneRandomOptions: (state, action) => {
      state.randomOptions = action.payload;
    },
    deleteRandomOptions: (state, action) => {
      state.allRandomOptions = state.allRandomOptions.filter(
        (randomOptions) => randomOptions._id !== action.payload
      );
    },
    updateRandomOptions: (state, action) => {
      state.allRandomOptions = state.allRandomOptions.map((randomOptions) => {
        if (randomOptions._id === action.payload._id) {
          return action.payload;
        } else {
          return randomOptions;
        }
      });
    },
  },
});

export const {
  addRandomOptions,
  deleteRandomOptions,
  updateRandomOptions,
  setOneRandomOptions,
  setRandomOptions,
} = randomOptionsSlice.actions;
export default randomOptionsSlice.reducer;
