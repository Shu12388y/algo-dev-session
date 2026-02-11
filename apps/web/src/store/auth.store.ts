import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth.feature";

export const auth_store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof auth_store.getState>;
export type AppDispatch = typeof auth_store.dispatch;
