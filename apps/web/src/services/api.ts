import { createAsyncThunk } from "@reduxjs/toolkit";

export const sign_up_handler = createAsyncThunk(
  "signup/auth",
  async (user, thunkAPI) => {
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(String(error));
    }
  },
);

export const sign_in_handler = createAsyncThunk(
  "signin/auth",
  async (user, thunkAPI) => {
    try {
      const response = await fetch("", {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      response.headers.set("authorization", data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(String(error));
    }
  },
);

export const problems = createAsyncThunk("problems", async (_, thunkAPI) => {
  try {
    const response = await fetch("", {
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


export const problem = createAsyncThunk("problem",async(id,thunkAPI)=>{
    try {
        const response = await fetch(`/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(String(error))
    }
})