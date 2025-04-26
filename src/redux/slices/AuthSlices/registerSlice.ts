import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {register, uploadFile, verifyOtpService} from "@/services/AuthServices/registerService";
import {
    RegisterSuccessResponse,
    RegisterFailResponse,
    FileUploadSuccessResponse, FileUploadFailResponse
} from "@/model/AuthModel/registerModel";


interface RegisterState {
    email: string;
    password: string;
    fullName: string;
    address: string;
    phoneNumber: string;
    secondaryPhoneNumber: string;
    profilePicture?: string;
    loading: boolean;
    error: string | null;
    successMessage: string | null;
    otp: string;
    file: File| null;
}

const initialRegisterState: RegisterState = {
    email: "",
    password: "",
    fullName: "",
    address: "",
    phoneNumber: "",
    secondaryPhoneNumber: "",
    profilePicture: undefined,
    loading: false,
    error: null,
    successMessage: null,
    otp: "",
    file: null,
};

// Async thunk for registration
export const registerUser = createAsyncThunk<
    RegisterSuccessResponse,
    {
        email: string;
        password: string;
        fullName: string;
        address: string;
        phoneNumber: string;
        secondaryPhoneNumber: string;
        profilePicture?: string;
    }, // argument type
    { rejectValue: RegisterFailResponse } // rejection type
>("auth/register", async (params, { rejectWithValue }) => {
    try {
        const response = await register(params);
        if (response.isSucsess) {
            return response;
        } else {
            return rejectWithValue(response);
        }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const apiError = error.response?.data as RegisterFailResponse;
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


export const uploadFileThunk = createAsyncThunk<
    FileUploadSuccessResponse,           // fulfilled payload type
    { file: File; token: string },       // thunk argument type
    { rejectValue: FileUploadFailResponse } // rejected payload type
>(
    'auth/uploadFile',  // Action type string
    async ({ file, token }, { rejectWithValue }) => {
        try {
            const response = await uploadFile({ file, token });

            if (response.success) {
                return response;  // Returns the successful response
            } else {
                // service-level failure: returns a rejected value
                return rejectWithValue(response);
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data as FileUploadFailResponse;
                return rejectWithValue({
                    success: false,
                    status: error.response?.status || 500,
                    message: apiError?.message || 'Failed connection.',
                    data: null,
                });
            }

            // Fallback error handling
            return rejectWithValue({
                success: false,
                status: 500,
                message: 'An unexpected error occurred.',
                data: null,
            });
        }
    }
);

export const verifyOtp = createAsyncThunk<
    { message: string }, // success return
    { email: string; otp: string }, // args
    { rejectValue: string } // reject return
>("auth/verifyOtpService", async ({ email, otp }, { rejectWithValue }) => {
    try {
        const response = await verifyOtpService(email, otp);


        if (response?.message !== "Wrong or expired OTP") {
            return { message: response?.message ?? "The email has been confirmed." };
        } else {
            return rejectWithValue(response?.message ?? "The OTP is not valid.");
        }
    } catch (error) {
        return rejectWithValue("An unexpected error occurred.");
    }
});

const registerSlice = createSlice({
    name: "register",
    initialState: initialRegisterState,
    reducers: {
        setRegisterEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        setRegisterPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        setFullName(state, action: PayloadAction<string>) {
            state.fullName = action.payload;
        },
        setAddress(state, action: PayloadAction<string>) {
            state.address = action.payload;
        },
        setPhoneNumber(state, action: PayloadAction<string>) {
            state.phoneNumber = action.payload;
        },
        setSecondaryPhoneNumber(state, action: PayloadAction<string>) {
            state.secondaryPhoneNumber = action.payload;
        },
        setProfilePicture(state, action: PayloadAction<string | undefined>) {
            state.profilePicture = action.payload;
        },
        setOtp(state, action: PayloadAction<string>) {
            state.otp = action.payload;
        },
        setFile(state, action: PayloadAction<File>) {
            state.file = action.payload;
        },
        clearRegisterState(state) {
            state.email = "";
            state.password = "";
            state.fullName = "";
            state.address = "";
            state.phoneNumber = "";
            state.secondaryPhoneNumber = "";
            state.profilePicture = undefined;
            state.loading = false;
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Register Faild";
                state.successMessage = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
                state.error = null;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Invalid OTP";
                state.successMessage = null;
            })
            .addCase( uploadFileThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
                state.error = null;
            })
            .addCase( uploadFileThunk.rejected, (state, action) => {
                state.loading = false;
                state.successMessage = null;
            });

    },
});

export const {
    setRegisterEmail,
    setRegisterPassword,
    setFullName,
    setAddress,
    setPhoneNumber,
    setSecondaryPhoneNumber,
    setProfilePicture,
    clearRegisterState,
    setOtp
} = registerSlice.actions;

export default registerSlice.reducer;
