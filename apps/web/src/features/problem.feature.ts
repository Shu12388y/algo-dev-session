    import { createSlice } from "@reduxjs/toolkit";
import { problems } from "../services/api";

interface Problems {
  loading: boolean;
  error: string;
  filterData: any[];
  data: any[];
}

const initialState: Problems = {
  loading: false,
  data: [],
  filterData: [],
  error: "",
};

const problemSlice = createSlice({
  name: "problems",
  initialState,
  reducers: {
    filterCatgory: (state, action) => {
      state.filterData = state.data.filter(
        (ele) => ele?.type == action.payload?.type,
      );
    },
    resetFilter: (state) => {
      state.data = state.filterData;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(problems.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(problems.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Something went wrong";
      })
      .addCase(problems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data =  action.payload;
        state.filterData = action.payload;
      });
  },
});

export default problemSlice.reducer;
