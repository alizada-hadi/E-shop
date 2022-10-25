import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: "",
  status: "idle",
  error: null,
};

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.shippingAddress = {};
      state.paymentMethod = "";
    },
    addToCart: (state, action) => {
      const availableItems = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (availableItems) {
        availableItems.quantity++;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item.quantity <= 1) {
        const filteredItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
        state.cartItems = filteredItems;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.cartItems = removeItem;
    },
    clearCartItems: (state) => {
      state.cartItems = [];
    },

    // ! shipping address

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },

    addPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default cartsSlice.reducer;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  saveShippingAddress,
  addPaymentMethod,
  clearCartItems,
  resetCart,
} = cartsSlice.actions;
