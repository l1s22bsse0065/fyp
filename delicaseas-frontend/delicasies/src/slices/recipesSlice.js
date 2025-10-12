import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// 🔹 Async thunk to fetch all recipes
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/recipes`);
      return res.data.recipes || [];
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔹 Async thunk to fetch a single recipe (if not found in state)
export const fetchRecipeById = createAsyncThunk(
  "recipes/fetchRecipeById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/recipes/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    list: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch all recipes
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // ✅ Fetch one recipe (add it to list if missing)
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        const found = state.list.find((r) => r._id === action.payload._id);
        if (!found) state.list.push(action.payload);
      });
  },
});

export default recipesSlice.reducer;
