import { configureStore } from "@reduxjs/toolkit";
import templatesReducer from "../Template/templatesReducer";
import userReducer from "../Profile/userReducer";
const store = configureStore({
  reducer: {
    templatesReducer,
    userReducer,
  },
});
export default store;
