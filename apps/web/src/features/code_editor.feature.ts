import { createSlice } from "@reduxjs/toolkit";

interface Editor {
  language: string;
  code_snippet: string;
  theme: string;
}

const initialState: Editor = {
  language: "python",
  code_snippet: `def greet():
    print("Hello, World!")

greet()`,
  theme: "light",
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
  },
});

export const { toggleLanguage, toggleTheme } = codeEditorReducer.actions;
