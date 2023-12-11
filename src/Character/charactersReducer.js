import { createSlice } from "@reduxjs/toolkit";
import { findCharactersByOwner } from "./client";

// TODO: Add real user ID

const initialCharacters = [];
const initialState = {
  characters: initialCharacters,
  character: {
    _id: "",
    ownerID: "",
    visibility: "",
    traits: [],
  },
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addCharacter: (state, action) => {
      state.templates = [action.payload, ...state.templates];
    },
    setCharacters: (state, action) => {
      state.templates = action.payload;
    },
    setCharacters: (state, action) => {
      state.template = action.payload;
    },
    deleteCharacter: (state, action) => {
      state.templates = state.templates.filter(
        (template) => template._id !== action.payload
      );
    },
    updateCharacter: (state, action) => {
      state.templates = state.templates.map((template) => {
        if (template._id === action.payload._id) {
          return action.payload;
        } else {
          return template;
        }
      });
    },
  },
});

export const {
  addCharacter,
  deleteCharacter,
  updateCharacter,
  setCharacter,
  setCharacters,
} = charactersSlice.actions;
export default charactersSlice.reducer;
