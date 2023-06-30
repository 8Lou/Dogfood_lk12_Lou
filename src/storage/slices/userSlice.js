// initial state
// ----------------------------------------------------

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  api  from "../../utils/Api";
import { isError, isLoading } from "../utilsStore";

const initialState = {
  data: {},
  loading: false,
};
// ----------------------------------------------------

// actions
// ----------------------------------------------------
export const getMyUser = createAsyncThunk(
  "getUser",
  async function (
    dataFromUp,
    { getState, dispatch, fulfillWithValue, rejectWithValue }
  ) {
    const data = await api.getUserInfo();
    return data;

  }
);

export const updateUser = createAsyncThunk("updateUser", async function (data) {
  console.log({ data });
  if (data.avatar) {
    const res = await api.updUserInfo({avatar: data.avatar});
    return res;
  } else {
    const res = await api.updUserInfo({name: data.name, about: data.about});
    return res;
  }
});

// ----------------------------------------------------
// slice // reducer
// ----------------------------------------------------

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getMyUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addMatcher(isError, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addMatcher(isLoading, (state) => {
    });
  },
});
// ----------------------------------------------------

export default userSlice.reducer;
