import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import orderService from "./orderService";

export const create_order = createAsyncThunk(
  "orders/create_order",
  async (data, thunkAPI) => {
    try {
      return await orderService.create_order(data);
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

export const order_detail = createAsyncThunk(
  "orders/order_detail",
  async (data, thunkAPI) => {
    try {
      return await orderService.order_detail(data);
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

export const payment = createAsyncThunk(
  "orders/payment",
  async (data, thunkAPI) => {
    try {
      return await orderService.make_payment(data);
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

export const payment_intend = createAsyncThunk(
  "orders/payment_intend",
  async (data, thunkAPI) => {
    try {
      return await orderService.payment_intend(data);
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

export const orders_mine = createAsyncThunk(
  "orders/orders_mine",
  async (user, thunkAPI) => {
    try {
      return await orderService.userOrders(user);
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

export const allOrders = createAsyncThunk(
  "orders/allOrders",
  async (user, thunkAPI) => {
    try {
      return await orderService.allOrders(user);
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

export const updateOrderAsDelivered = createAsyncThunk(
  "orders/updateOrderAsDelivered",
  async (data, thunkAPI) => {
    // console.log(data);
    try {
      return await orderService.updateOrderAsDelivered(data);
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

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (data, thunkAPI) => {
    try {
      return await orderService.deleteOrder(data);
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
  orders: [],
  order: {},
  payment: {},
  status: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = {};
      state.orders = [];
      state.status = "idle";
      state.error = null;
    },
    resetPayment: (state) => {
      state.payment = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create_order.pending, (state) => {
        state.status = "loading";
      })
      .addCase(create_order.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addCase(create_order.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(order_detail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(order_detail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addCase(order_detail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(payment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(payment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addCase(payment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(payment_intend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(payment_intend.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.payment = action.payload;
      })
      .addCase(payment_intend.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(orders_mine.pending, (state) => {
        state.status = "loading";
      })
      .addCase(orders_mine.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(orders_mine.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(allOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(allOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(allOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateOrderAsDelivered.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsDelivered.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateOrderAsDelivered.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        const orders = state.orders.filter(
          (order) => order.id !== action.payload.id
        );
        state.orders = [...orders];
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetOrder, resetPayment } = orderSlice.actions;

export default orderSlice.reducer;
