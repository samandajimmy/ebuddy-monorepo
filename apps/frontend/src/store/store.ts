import { configureStore } from "@reduxjs/toolkit";
import { userReducer, loadingReducer } from "./reducers";

export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;