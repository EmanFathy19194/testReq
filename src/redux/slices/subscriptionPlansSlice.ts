import {addSubscribeToPlan, getSubscriptionPlans} from "@/services/subscriptionPlansService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import SubscriptionPlanModel from "@/model/subscriptionPlan";
import AddSubscriptionPlanModel from "@/model/subscriptionPlan";
import AddSubscribeToPlanParams from "@/model/subscriptionPlan";

interface SubscriptionPlansState {
  loading: boolean;
  plans: SubscriptionPlanModel[];
  successMessage: string | null;
  addingSubscription: boolean; // Track the loading state for adding subscription
  addSubscriptionError: string | null; // Track any error from adding subscription
  addSubscriptionSuccess: string | null;

}

const initialSubscriptionPlansState: SubscriptionPlansState = {
  loading: true,
  plans: [],
  successMessage: null,
  addingSubscription: false, // Subscription loading initially false
  addSubscriptionError: null, // No error initially
  addSubscriptionSuccess: null,

};

const subscriptionPlansSlice = createSlice({
  name: "subscriptionPlans",
  initialState: initialSubscriptionPlansState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setPlans(state, action: PayloadAction<SubscriptionPlanModel[]>) {
      state.plans = action.payload ?? [];
    },
    clearPlans(state) {
      state.plans = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlansThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlansThunk.fulfilled, (state, action) => {
        state.plans = action.payload ?? [];
        state.loading = false;
      })
      .addCase(fetchPlansThunk.rejected, (state) => {
        state.loading = false;
      })
        .addCase(addSubscribeToPlanThunk.pending, (state) => {
          state.addingSubscription = true;
          state.addSubscriptionError = null;
          state.addSubscriptionSuccess = null;
        })
        .addCase(addSubscribeToPlanThunk.fulfilled, (state, action: PayloadAction<AddSubscriptionPlanModel>) => {
          state.addingSubscription = false;
          state.addSubscriptionSuccess = action.payload.message;
          state.addSubscriptionError = null;
        })
        .addCase(addSubscribeToPlanThunk.rejected, (state, action) => {
          state.addingSubscription = false;
          state.addSubscriptionSuccess = null;
          state.addSubscriptionError = action.payload || "Subscription failed, please try again.";
        });
  },
});
// Async thunk for fetching subscription plans
export const fetchPlansThunk = createAsyncThunk<
  SubscriptionPlanModel[], // The type of data the thunk resolves
  void, // The parameter type (void if no parameters are passed)
  { rejectValue: string } // The reject type
>("subscription/fetchPlans", async (_, { rejectWithValue }) => {
  try {
    const plans = await getSubscriptionPlans();
    return plans ?? []; // Ensure it always resolves to an array
  } catch (error) {
    return rejectWithValue("Failed to fetch subscription plans");
  }
});
export const addSubscribeToPlanThunk = createAsyncThunk<
    AddSubscriptionPlanModel,
    AddSubscribeToPlanParams,
    { rejectValue: string }
>("subscription/addSubscribeToPlan", async (params, { rejectWithValue }) => {
  try {
    const result = await addSubscribeToPlan(params);
    if (result) {
      return result;
    } else {
      return rejectWithValue("Failed to subscribe to the plan.");
    }
  } catch (error) {
    return rejectWithValue("Subscription request failed.");
  }
});

export const { setLoading, setPlans, clearPlans } =
  subscriptionPlansSlice.actions;

export default subscriptionPlansSlice.reducer;
