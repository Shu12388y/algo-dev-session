import { createSlice } from "@reduxjs/toolkit";
import { runCode, submitCode } from "../services/api";

interface Editor {
  language: string;
  code_snippet: string;
  theme: string;
  code: string;
  loading: boolean;
  error: string;
  data: string;
  questionID: string;
  stdout:string;
  stderr:string
}

const initialState: Editor = {
  language: "python",
  code_snippet: `def greet():
    print("Hello, World!")

greet()`,
  theme: "light",
  code: "",
  loading: false,
  error: "",
  data: "",
  questionID: "",
  stdout:"",
  stderr:""
};

const codeSnippets = {
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,

  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,

  javascript: `function greet() {
    console.log("Hello, World!");
}

greet();`,

  python: `def greet():
    print("Hello, World!")

greet()`,

  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
};

export const codeEditorReducer = createSlice({
  name: "code-editor",
  initialState,
  reducers: {
    toggleLanguage: (state, action) => {
      state.language = action.payload;
      state.code_snippet = codeSnippets[action.payload];
    },
    toggleTheme: (state, action) => {
      state.theme = action.payload;
    },
    onChangeCode: (state, action) => {
      state.code = action.payload;
    },
    handleQuestion: (state, action) => {
      state.questionID = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(runCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(runCode.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error as string) || "Something went wrong";
      })
      .addCase(runCode.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.stdout = action.payload.data.stdOutput
        state.stderr = action.payload.data.stdErr
      })
      .addCase(submitCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitCode.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error as string) || "Something went wrong";
      })
      .addCase(submitCode.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

export const { toggleLanguage, toggleTheme, onChangeCode,handleQuestion } =
  codeEditorReducer.actions;
