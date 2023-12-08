import { configureStore } from "@reduxjs/toolkit";
import templatesReducer from "../Template/templatesReducer";
const store = configureStore({
  reducer: {
    templatesReducer,
  },
});
export default store;
