import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsService from "./productsService";

// ! fetch products

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (thunkAPI) => {
    try {
      return await productsService.fetchProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ! get product detail

export const getProductDetail = createAsyncThunk(
  "products/getProductDetail",
  async (id, thunkAPI) => {
    try {
      return await productsService.productDetail(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (data, thunkAPI) => {
    try {
      return await productsService.createProduct(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (data, thunkAPI) => {
    try {
      return await productsService.removeProduct(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  products: [],
  product: {},
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.products = [];
    },
    filterProductByCategory: (state, action) => {
      const products = state.products.filter(
        (product) => product.category.category_name === action.payload
      );
      state.products = products;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getProductDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = [...state.products, action.payload];
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id } = action.payload;
        const products = state.products.filter((product) => product.id !== id);
        state.products = products;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;

export const { filterProductByCategory, reset } = productsSlice.actions;
