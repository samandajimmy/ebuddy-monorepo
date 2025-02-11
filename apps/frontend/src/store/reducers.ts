import { createReducer } from "@reduxjs/toolkit";
import { setUser, setToken, setLoading, clearUser } from "./actions";
import { User } from "@ebuddy/shared";

interface UserState {
  user: User | null | undefined; // Allowing undefined explicitly
  token: String
}

const initialState: UserState = {
  user: null, // Initial state can be undefined
  token: ""
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setToken, (state, action) => {
      state.token = action.payload;
    })
    .addCase(clearUser, (state) => {
      state.user = null;
      state.token = "";
    });
});

interface LoadingState {
  status: boolean,
  success?: boolean,
  error?: string
}


const initialLoadingState: LoadingState = {
  status: false,
  success: false,
  error: ''
};

const loadingReducer = createReducer(initialLoadingState, (builder) => {
  builder
    .addCase(setLoading, (state, action) => {
      state.status = action.payload.status;
      state.success = action.payload.success;
      state.error = action.payload.error;
    })
});

export { userReducer, loadingReducer };
