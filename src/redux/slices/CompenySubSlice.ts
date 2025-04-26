import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getSubscriptionStatus } from "@/services/subscriptionPlansService";  // Assuming you have a service for API calls
import axios from "axios";
import {CompanySubscriptionStatusError, CompanySubscriptionStatusResponse} from "@/model/SubStatus";


interface GetSubscriptionStatusState {
    companyId: number| null;
    loading: boolean;
    error: string | null;
    data:CompanySubscriptionStatusResponse["data"]| null;
    status: number | null;
    success: boolean | null;
    message: string | null;
    token: string | null;
}

const initialGetSubscriptionStatusState: GetSubscriptionStatusState = {
    companyId: null,
    loading: false,
    error: null,
    data: null,
    status: null,
    success: null,
    message: null,
    token: null,
};

// Thunk for getting subscription status
// getSubscriptionStatus
export const SubscriptionStatusTh = createAsyncThunk<
    CompanySubscriptionStatusResponse["data"], // Only return `data`
    { id: number; token: string },
    { rejectValue: CompanySubscriptionStatusError }
>(
    "subscriptionStatus/getStatus",
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const response = await getSubscriptionStatus(id, token);
            if (response?.success) {
                return response.data;
            } else {
                return rejectWithValue({
                    success: false,
                    status: response?.status ?? 500,
                    message: response?.message ?? "Unknown error occurred",
                    data: response?.data??null
                } as CompanySubscriptionStatusError);
            }
        } catch (error: any) {
            return rejectWithValue({
                success: false,
                status: 500,
                message: "Failed to fetch subscription status",
                data: error,
            });
        }
    }
);
const GetSubscriptionStatusSlice = createSlice({
    name: "GetSubscriptionStatus",
    initialState: initialGetSubscriptionStatusState,
    reducers: {
        setcompanyId(state, action: PayloadAction<number>) {
            state.companyId = action.payload;
        },
        settoken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(SubscriptionStatusTh.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(SubscriptionStatusTh.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(SubscriptionStatusTh.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to get subscription status";
                state.status = action.payload?.status || null;
                state.success = false;
                state.data = null;
            });
    },
});

export const { setcompanyId } = GetSubscriptionStatusSlice.actions;

export default GetSubscriptionStatusSlice.reducer;


