import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AddSubPlanFailResponse, AddSubPlanSuccessResponse } from "@/model/addSubPlan";
import { addSubPlan } from "@/services/addSubPlan";

interface AddSubPlanState {
    companyId: string;
    subscriptionPlanId: number;
    subscriptionDuration: number;
    loading: boolean;
    error: string | null;
    data: AddSubPlanSuccessResponse["data"] | null;
    status: number | null;
    success: boolean | null;
    message: string | null;
    token: string | null;
    url: string | null;
    companySubscriptionId:number;
}

const initialAddSubPlanState: AddSubPlanState = {
    companyId: "",
    subscriptionPlanId: 0,
    subscriptionDuration: 0,
    loading: false,
    error: null,
    data: null,
    status: null,
    success: null,
    message: null,
    token: null,
    url: null,
    companySubscriptionId:0,
};

// Update the thunk to include the token properly
export const addSubPlanThunk = createAsyncThunk<
    AddSubPlanSuccessResponse,
    { companyId: string; subscriptionPlanId: number;url:string; subscriptionDuration: number; token: string }, // Define token type as string
    { rejectValue: AddSubPlanFailResponse }
>("addSubPlan", async ({ companyId, subscriptionPlanId,url, subscriptionDuration, token }, { rejectWithValue }) => {
    try {
        const response = await addSubPlan({ companyId, subscriptionPlanId, url,subscriptionDuration, token }); // Pass token here

        if (response.Sucsess) {
            return response;
        } else {
            return rejectWithValue(response as AddSubPlanFailResponse);
        }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const apiError = error.response?.data as AddSubPlanFailResponse;
            return rejectWithValue({
                Sucsess: false,
                status: error.response?.status || 500,
                message: apiError?.message || "Failed connection.",
                data: null,
            });
        }

        return rejectWithValue({
            Sucsess: false,
            status: 500,
            message: "حدث خطأ غير متوقع. حاول مرة أخرى لاحقًا.",
            data: null,
        });
    }
});
const AddSubPlanSlice = createSlice({
    name: "AddSubPlan",
    initialState: initialAddSubPlanState,
    reducers: {
        setcompanyId(state, action: PayloadAction<string>) {
            state.companyId = action.payload;
        },
        setsubscriptionPlanId(state, action: PayloadAction<number>) {
            state.subscriptionPlanId = action.payload;
        },
        setsubscriptionDuration(state, action: PayloadAction<number>) {
            state.subscriptionDuration = action.payload;
        },
        setCompanySubscriptionId(state, action: PayloadAction<number>) {
            console.log('Setting companySubscriptionId:', action.payload);
            state.companySubscriptionId = action.payload;
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        seturl(state, action: PayloadAction<string>) {
            state.url = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(addSubPlanThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addSubPlanThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload.data;
                state.status = action.payload.status;
                state.success = action.payload.Sucsess;
                state.companySubscriptionId=action.payload.data.companySubscriptionId;
                state.message = action.payload.message;
            })
            .addCase(addSubPlanThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Fail in Add Subscription";
                state.status = action.payload?.status || null;
                state.success = false;
                state.data = null;
            });
    },
});

export const { setcompanyId, setsubscriptionPlanId, setsubscriptionDuration, setToken,seturl,setCompanySubscriptionId } = AddSubPlanSlice.actions;
export default AddSubPlanSlice.reducer;
