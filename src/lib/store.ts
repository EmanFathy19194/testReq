import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/slices/AuthSlices/loginSlice";
import registerReducer from "../redux/slices/AuthSlices/registerSlice";
import subscriptionPlansReducer from "../redux/slices/subscriptionPlansSlice";
import addSubPlanReducer from "../redux/slices/addSubPlanSlice";
import resetPasswordReducer from "../redux/slices/AuthSlices/resstPasswordSlice";
import SubscriptionStatusReducer from "../redux/slices/CompenySubSlice";
export const store = configureStore({
  reducer: {
    login: loginReducer,
    register:registerReducer,
    resetPassword: resetPasswordReducer,
    subscriptionPlans: subscriptionPlansReducer,
    addSubPlan: addSubPlanReducer,
    SubStatus:SubscriptionStatusReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
