import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isAuthenticated: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  credentials: {
    email: "",
    password: "",
  },
};

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://be-multi-role.vercel.app/api/v1/login",
        {
          email: credentials.email,
          password: credentials.password,
        }
      );
      return { response: response.data, credentials };
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const { credentials } = thunkAPI.getState().auth;
    const response = await axios.get(
      "https://be-multi-role.vercel.app/api/v1/me",
      {
        auth: {
          username: credentials.email,
          password: credentials.password,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const LogOut = createAsyncThunk("user/LogOut", async () => {
  await axios.delete("https://be-multi-role.vercel.app/api/v1/logout");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.response;
      state.isAuthenticated = true;
      state.credentials = {
        email: action.payload.credentials.email,
        password: action.payload.credentials.password,
      };
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
