import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import productsReducer from "../features/products/productsSlice";
import cartsReducer from "../features/carts/cartsSlice";
import orderReducer from "../features/order/orderSlice";
import reviewsReducer from "../features/reviews/reviewsSlice";
import { combineReducers } from "@reduxjs/toolkit";

import thunk from "redux-thunk";
// ! redux persist

import storage from "redux-persist/lib/storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  products: productsReducer,
  carts: cartsReducer,
  orders: orderReducer,
  reviews: reviewsReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
