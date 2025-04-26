import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {FailResponse, SuccessResponse} from "@/model/AuthModel/basicModel";
import {
    resetPassword,
    sendOtpForPasswordReset,
    verifyResetPasswordOtp
} from "@/services/AuthServices/resetPasswordService";


interface ResetPasswordState {
    email: string;
    newPassword: string;
    loading: boolean;
    error: string | null;
    otp: string | null;
    data:boolean;
    isSucsess: boolean;
    status: number| null;
    message: string | null;
}

const initialResetPasswordState: ResetPasswordState = {
    email: "",
    newPassword: "",
    loading: false,
    error:  null,
    otp: "",
    data:false,
    isSucsess: false,
    status: null,
    message: null
};

// Async thunk for sendOtpForPasswordReset/////verifyResetPasswordOtp/////resetPassword
export const sendOtpPasswordResetTH = createAsyncThunk<
    SuccessResponse, // success return type
    { email: string }, // thunk argument
    { rejectValue: FailResponse } // rejection type
>(
    "auth/sendOtpResetPassword",
    async ({ email }, { rejectWithValue }) => {
        try {
            const response = await sendOtpForPasswordReset({email});

            if (response.isSucsess) {
                return response as SuccessResponse;
            }

            return rejectWithValue(response as FailResponse);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data as FailResponse;

                return rejectWithValue({
                    isSucsess: false,
                    status: error.response?.status || 500,
                    message: apiError?.message || "An error occurred",
                    data: null,
                });
            }

            return rejectWithValue({
                isSucsess: false,
                status: 500,
                message: "Unexpected error occurred",
                data: null,
            });
        }
    }
);

/////////////////////////////////////////////////////////////
export const verifyResetPasswordOtpTH = createAsyncThunk<
    SuccessResponse, // success return type
    { email: string; otp:string}, // thunk argument
    { rejectValue: FailResponse } // rejection type
>(
    "auth/verifyResetPassword",
    async ({ email,otp }, { rejectWithValue }) => {
        try {
            const response = await verifyResetPasswordOtp({email,otp});

            if (response.status==200) {
                return response as SuccessResponse;
            }

            return rejectWithValue(response as FailResponse);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data as FailResponse;

                return rejectWithValue({
                    isSucsess: false,
                    status: error.response?.status || 500,
                    message: apiError?.message || "An error occurred",
                    data: null,
                });
            }

            return rejectWithValue({
                isSucsess: false,
                status: 500,
                message: "Unexpected error occurred",
                data: null,
            });
        }
    }
);

export const resetPasswordTH = createAsyncThunk<
    SuccessResponse, // success return type
    { email: string; newPassword: string; otp: string;}, // thunk argument
    { rejectValue: FailResponse } // rejection type
>(
    "auth/ResetPassword",
    async ({ email,newPassword,otp }, { rejectWithValue }) => {
        try {
            const response = await resetPassword({email,newPassword,otp});

            if (response.status==200||response.status==201) {
                return response as SuccessResponse;
            }

            return rejectWithValue(response as FailResponse);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data as FailResponse;

                return rejectWithValue({
                    isSucsess: false,
                    status: error.response?.status || 500,
                    message: apiError?.message || "An error occurred",
                    data: null,
                });
            }

            return rejectWithValue({
                isSucsess: false,
                status: 500,
                message: "Unexpected error occurred",
                data: null,
            });
        }
    }
);

const ResetPasswordSlice = createSlice({
    name: "ResetPassword",
    initialState: initialResetPasswordState,
    reducers: {
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        setnewPassword(state, action: PayloadAction<string>) {
            state.newPassword = action.payload;
        },
        setOtp(state, action: PayloadAction<string>) {
            state.otp = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOtpPasswordResetTH.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOtpPasswordResetTH.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload.data;
                state.status = action.payload.status;
                state.isSucsess = action.payload.isSucsess;
                state.message = action.payload.message;
            })
            .addCase(sendOtpPasswordResetTH.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "An error occurred";
            })
            .addCase(verifyResetPasswordOtpTH.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload.data;
                state.status = action.payload.status;
                state.isSucsess = action.payload.isSucsess;
                state.message = action.payload.message;
            })
            .addCase(verifyResetPasswordOtpTH.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "An error occurred";
            })
            .addCase(resetPasswordTH.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload.data;
                state.status = action.payload.status;
                state.isSucsess = action.payload.isSucsess;
                state.message = action.payload.message;
            })
            .addCase(resetPasswordTH.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "An error occurred";
            });

    },
});

export const { setEmail, setnewPassword, setOtp } = ResetPasswordSlice.actions;
export default ResetPasswordSlice.reducer;
