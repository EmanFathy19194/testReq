import axios from 'axios';
import {AddSubPlanFailResponse, AddSubPlanSuccessResponse} from "@/model/addSubPlan";


export const addSubPlan = async ({companyId,subscriptionPlanId,url, subscriptionDuration,token}: {
    companyId: string;
    subscriptionPlanId: number;
    url: string;
    subscriptionDuration: number;
    token: string;
}): Promise<AddSubPlanSuccessResponse | AddSubPlanFailResponse> => {
    try {
        const response = await axios.post('/api/companySubscription', {
            companyId,
            subscriptionPlanId,
            url,
            subscriptionDuration,
        },{
            headers: {
                Authorization: token ? `Bearer ${token}` : '', // Add the token in the header
            }
        });
        const result: AddSubPlanSuccessResponse = response.data;
        console.log(result);
        return result;
    } catch (error) {
        // Handle API errors
        if (axios.isAxiosError(error)) {
            // If error is an AxiosError, check for response from the API
            const errorData = error.response?.data;

            const result: AddSubPlanFailResponse = {
                Sucsess: false,
                status: error.response?.status || 500,
                message: errorData?.message || 'An unexpected error occurred.',
                data: null,
            };


            return result;
        }
        return {
            Sucsess: false,
            status: 500,
            message: 'An unexpected error occurred.',
            data: null,
        };
    }
};
