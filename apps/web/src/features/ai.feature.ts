import { createSlice } from "@reduxjs/toolkit";
import { generateQuestion } from "../services/api";

const initialState = {
  loading: true,
  error: "",
  data:""
};

export const aiReducer = createSlice({
  name: "ai",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(generateQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.error) || "Something went wrong";
      });
  },
});
