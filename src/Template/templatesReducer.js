import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  templates: [],
  template: { title: "", description: "" },
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
    setTemplate: (state, action) => {
      state.template = action.payload;
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
