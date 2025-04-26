import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {deactivateDevice, signIn} from "@/services/AuthServices/loginService";
import { LoginSuccessResponse, LoginFailResponse } from "@/model/AuthModel/loginModel";


interface SignInState {
  deviceId: string;
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  user: LoginSuccessResponse["data"]["user"] | null;
  token: string | null;
  isSubscribed: boolean | null;
  profilePicture: string | null;
  secondaryPhoneNumber: number | null;
  phoneNumber: number | null;
  address: string | null;
  isSucsess: boolean;
  status: number| null;
  message: string | null;
}

const initialSignInState: SignInState = {
  deviceId: "",
  email: "",
  password: "",
  loading: false,
  error: null,
  user: null,
  token: null,
  isSubscribed: null,
  profilePicture: null,
  secondaryPhoneNumber: null,
  phoneNumber: null,
  address: null,
  isSucsess: false,
  status: null,
  message: null
};

// Async thunk for login
export const login = createAsyncThunk<
    LoginSuccessResponse["data"], // Success return type
    { deviceId: string; email: string; password: string }, // Argument type
    { rejectValue: LoginFailResponse } // Rejection type
>("auth/login", async ({ deviceId, email, password }, { rejectWithValue }) => {
  try {
    const response = await signIn({ deviceId, email, password });

    if (response.isSucsess) {
      return response.data;
    } else {
      return rejectWithValue(response as LoginFailResponse);
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data as LoginFailResponse;
      return rejectWithValue({
        isSucsess: false,
        status: error.response?.status || 500,
        message: apiError?.message || "خطأ في الاتصال بالخادم.",
        data: null,
      });
    }

    return rejectWithValue({
      isSucsess: false,
      status: 500,
      message: "حدث خطأ غير متوقع. حاول مرة أخرى لاحقًا.",
      data: null,
    });
  }
});
///////////////////////////////////////////////////////////////////////
export const deactivateDeviceThunk = createAsyncThunk<
    LoginSuccessResponse, // Success return type
    { deviceId: string }, // Argument type
    { rejectValue: LoginFailResponse } // Rejection type
>('device/deactivate', async ({ deviceId }, { rejectWithValue }) => {
  try {
    const response = await deactivateDevice( deviceId);

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data;
      return rejectWithValue({
        isSucsess: false,
        status: error.response?.status || 500,
        message: apiError?.message || 'فشل في تعطيل الجهاز.',
        data: null,
      });
    }

    return rejectWithValue({
      isSucsess: false,
      status: 500,
      message: 'حدث خطأ غير متوقع أثناء محاولة التعطيل.',
      data: null,
    });
  }
});

const loginSlice = createSlice({
  name: "auth",
  initialState: initialSignInState,
  reducers: {
    setdeviceId(state, action: PayloadAction<string>) {
      state.deviceId = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isSubscribed = null;
      state.profilePicture = null;
      state.secondaryPhoneNumber = null;
      state.phoneNumber = null;
      state.address = null;
      state.email = "";
      state.password = "";
      state.deviceId = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isSubscribed = action.payload.isSubscribed;
          state.profilePicture = action.payload.profilePicture;
          state.secondaryPhoneNumber = action.payload.secondaryPhoneNumber;
          state.phoneNumber = action.payload.phoneNumber;
          state.address = action.payload.address;
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || "Error.";
        })
        .addCase(deactivateDeviceThunk.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.status = action.payload.status;
          state.isSucsess = action.payload.isSucsess;
          state.message = action.payload.message;
        })
        .addCase(deactivateDeviceThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || "Error.";
        });
  },
});

export const { setdeviceId, setEmail, setPassword, logout } = loginSlice.actions;
export default loginSlice.reducer;
