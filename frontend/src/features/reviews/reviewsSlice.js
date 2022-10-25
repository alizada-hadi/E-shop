import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewsService from "./reviewsService";

const initialState = {
  reviews: [],
  status: "idle",
  error: null,
};

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (data, thunkAPI) => {
    try {
      return await reviewsService.createReview(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    resetReviews: (state) => {
      state.reviews = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetReviews } = reviewsSlice.actions;

export default reviewsSlice.reducer;
