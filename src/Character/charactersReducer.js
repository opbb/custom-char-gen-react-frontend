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
      state.characters = [action.payload, ...state.characters];
    },
    setCharacters: (state, action) => {
      state.characters = action.payload;
    },
    deleteCharacter: (state, action) => {
      state.characters = state.characters.filter(
        (character) => character._id !== action.payload
      );
    },
    updateCharacter: (state, action) => {
      state.characters = state.characters.map((character) => {
        if (character._id === action.payload._id) {
          return action.payload;
        } else {
          return character;
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
