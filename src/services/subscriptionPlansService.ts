import { handleApiResponse } from "@/util/apiHandler";
import axios from "axios";
import AddSubscribeToPlanParams from "../model/subscriptionPlan"
import SubscriptionPlanModel from "../model/subscriptionPlan";
import AddSubscriptionPlanModel from "../model/subscriptionPlan";
import { CompanySubscriptionStatusResponse} from "@/model/SubStatus";
export const getSubscriptionPlans = async (): Promise<
  SubscriptionPlanModel[] | null
> => {
  try {
    const response = await axios.get("/api/SubscriptionPlan", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return handleApiResponse<SubscriptionPlanModel[]>(response);
  } catch (e) {
    console.log("Error fetching subscription plans:", e);
    return null;
  }
};


export const addSubscribeToPlan = async (
    params: AddSubscribeToPlanParams
): Promise<AddSubscriptionPlanModel | null> => {
  try {
    const response = await axios.post("/api/companySubscription", null, {
      params,
    });

    return response.data as AddSubscriptionPlanModel;
  } catch (e: any) {
    console.error("Error subscribing to plan:", e);
    return null;
  }
};

export const getSubscriptionStatus = async (subCompanyId: number,token:string): Promise<CompanySubscriptionStatusResponse| null> => {
  try {
    const response = await axios.get(`/api/companySubscription/company-subscriptions/${subCompanyId}/status`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '', // Add the token in the header
      }
    });

    if (response.data.success) {
      return response.data;
    } else {
      console.error("API error:", response.data.message);
      return null;
    }
  } catch (e) {
    console.log("Error fetching subscription status:", e);
    return null;
  }
};







