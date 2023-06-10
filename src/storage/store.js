import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import userSlice from "./slices/userSlice";
import { api } from "../utils/Api";

const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
  },
  // middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
  //   thunk: {
  //     extraArgument: api
  //   }
  // })
});

export default store;
