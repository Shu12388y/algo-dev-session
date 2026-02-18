import { createAsyncThunk } from "@reduxjs/toolkit";
import { signin_mutation, signup_mutation } from "../graphql/auth.query";

const URL = "http://localhost:4000";

interface User {
  firstname: string;
  lastname?: string;
  email: string;
  password: string;
}

export const sign_up_handler = createAsyncThunk(
  "signup/auth",
  async (user: User, thunkAPI) => {
    try {
      const response = await fetch(`${URL}/graphql/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: signup_mutation,
          variables: {
            email: user?.email,
            firstname: user?.firstname,
            lastname: user?.lastname,
            password: user?.password,
          },
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(String(error));
    }
  },
);

export const sign_in_handler = createAsyncThunk(
  "signin/auth",
  async (user: Omit<User, "firstname" | "lastname">, thunkAPI) => {
    try {
      const response = await fetch(`${URL}/graphql/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          query: signin_mutation,
          variables: {
            email: user.email,
            password: user.password,
          },
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(String(error));
    }
  },
);

export const problems = createAsyncThunk("problems", async (_, thunkAPI) => {
  try {
    const response = await fetch(`${URL}/question/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(String(error));
  }
});

export const problem = createAsyncThunk("problem", async (id, thunkAPI) => {
  try {
    const response = await fetch(`${URL}/question/question/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(String(error));
  }
});

export const generateQuestion = createAsyncThunk(
  "generatequestion",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${URL}/ai/generatequestion`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(String(error));
    }
  },
);
