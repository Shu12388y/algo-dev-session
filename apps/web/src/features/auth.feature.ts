import { createSlice } from "@reduxjs/toolkit";
import { sign_up_handler, sign_in_handler } from "../services/api";

export interface AuthState {
  is_loggedin: boolean;
  error: string;
  loading: boolean;
  data: string;
}

const initialState: AuthState = {
  is_loggedin: false,
  error: "",
  loading: false,
  data: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sign_up_handler.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(sign_up_handler.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Something went wrong";
      })
      .addCase(sign_up_handler.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload;
        state.is_loggedin = false;
      })
      .addCase(sign_in_handler.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(sign_in_handler.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Something went wrong";
      })
      .addCase(sign_in_handler.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.is_loggedin = true;
      });
  },
});

export default authSlice.reducer;
