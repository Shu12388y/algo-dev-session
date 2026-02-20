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
    return data;
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
      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(String(error));
    }
  },
);

interface submission {
  source_code: string;
  language: string;
  questionId: string;
}

export const runCode = createAsyncThunk(
  "runcode",
  async (obj: submission, thunkAPI) => {
    try {
      const token = (await window.cookieStore.get("auth")).value;
      const response = await fetch(`${URL}/submission/run`, {
        method: "POST",
        body: JSON.stringify({
          source_code: obj.source_code,
          language: obj.language,
          questionid: obj.questionId,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token.toString(),
        },
      });
      const data = await response.json();
      const res = await get_submission(data.data.data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(String(error));
    }
  },
);

export const submitCode = createAsyncThunk(
  "submitcode",
  async (obj: submission, thunkAPI) => {
    try {
      const response = await fetch(`${URL}/submission/submit`, {
        method: "POST",
        body: JSON.stringify({
          source_code: obj.source_code,
          language: obj.language,
          questionid: obj.questionId,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(String(error));
    }
  },
);

export const get_submission = async (id: string) => {
  const MAX_TRY = 15;
  let INITIAL_TRY = 0;
  try {
    while (INITIAL_TRY < MAX_TRY) {
      const response = await fetch(`${URL}/submission/submission/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data)
      if (data?.data.status === "QUEUED") {
        INITIAL_TRY += 1;
        await new Promise((r) => setTimeout(r, 4000));
      } else {
        return data;
      }
    }
  } catch (error) {
    console.log(error);
    INITIAL_TRY += 1;
    await new Promise((r) => setTimeout(r, 4000));
  }
};
