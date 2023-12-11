import { configureStore } from "@reduxjs/toolkit";
import templatesReducer from "../Template/templatesReducer";
import userReducer from "../Profile/userReducer";
import charactersReducer from "../Character/charactersReducer";
import randomOptionsReducer from "../RandomOptions/randomOptionsReducer";
import searchReducer from "../Search/searchReducer";
const store = configureStore({
  reducer: {
    templatesReducer,
    userReducer,
    charactersReducer,
    randomOptionsReducer,
    searchReducer,
  },
});
export default store;
