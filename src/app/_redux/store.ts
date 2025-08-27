import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { postsReducer } from "./postsSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    postsReducer,
  },
});

export type State = ReturnType<typeof store.getState>;
export type storeDispatch = typeof store.dispatch;
