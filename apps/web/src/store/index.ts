import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth.feature";
import { problemSlice } from "../features/problem.feature";
import { codeEditorReducer } from "../features/code_editor.feature";
import { aiReducer } from "../features/ai.feature";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    codeEditor: codeEditorReducer.reducer,
    problems: problemSlice.reducer,
    ai:aiReducer.reducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;