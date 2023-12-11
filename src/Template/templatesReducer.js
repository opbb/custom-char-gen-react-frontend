import { createSlice } from "@reduxjs/toolkit";
import { findTemplatesByOwner } from "./client";

// TODO: Add real user ID
const initialTemplates = [];
const initialState = {
  templates: initialTemplates,
  template: {
    _id: "",
    ownerID: "",
    visibility: "",
    title: "",
    description: "",
    traits: [],
  },
};

const templatesSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    addTemplate: (state, action) => {
      state.templates = [action.payload, ...state.templates];
    },
    setTemplates: (state, action) => {
      state.templates = action.payload;
    },
    setTemplate: (state, action) => {
      state.template = action.payload;
    },
    deleteTemplate: (state, action) => {
      state.templates = state.templates.filter(
        (template) => template._id !== action.payload
      );
    },
    updateTemplate: (state, action) => {
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
  addTemplate,
  deleteTemplate,
  updateTemplate,
  setTemplate,
  setTemplates,
} = templatesSlice.actions;
export default templatesSlice.reducer;
