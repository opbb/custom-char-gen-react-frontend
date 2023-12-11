import { configureStore } from "@reduxjs/toolkit";
import templatesReducer from "../Template/templatesReducer";
import userReducer from "../Profile/userReducer";
import charactersReducer from "../Character/charactersReducer";
import randomOptionsReducer from "../RandomOptions/randomOptionsReducer";
const store = configureStore({
  reducer: {
    templatesReducer,
    userReducer,
    charactersReducer,
    randomOptionsReducer,
  },
});
export default store;
