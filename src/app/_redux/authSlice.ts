import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getLocalStorageItem } from "../utils/storage";

interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: getLocalStorageItem("token"),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setToken: (state, action) => {
      state.isLoading = false;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
      toast.success("Login Successfully");
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload, {});
    },
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setLoading, setToken, setError, removeToken } =
  authSlice.actions;
