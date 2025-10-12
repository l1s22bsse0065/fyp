import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import recipeReducer from "../slices/recipesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    recipe: recipeReducer,
  },
});
