
import axios from "axios";
import {FailResponse, SuccessResponse} from "@/model/AuthModel/basicModel";

export const sendOtpForPasswordReset = async ({email}: {
    email: string;
}): Promise<SuccessResponse | FailResponse> => {
    try {
        const response = await axios.post('/api/Auth/send-otp-ForPasswordReset', {
            email,
        });
        const result:SuccessResponse = response.data;
        console.log(result);
        return result;
    } catch (error) {
        // Handle API errors
        if (axios.isAxiosError(error)) {
            // If error is an AxiosError, check for response from the API
            const errorData = error.response?.data;

            const result: FailResponse = {
                isSucsess: false,
                status: error.response?.status || 500,
                message: errorData?.message || 'An unexpected error occurred.',
                data: null,
            };


            return result;
        }
        return {
            isSucsess: false,
            status: 500,
            message: 'An unexpected error occurred.',
            data: null,
        };
    }
};

/////////////////////////////////////////////////////////////////////////////
export const verifyResetPasswordOtp = async ({email,otp}: {
    email: string;
    otp: string;
}): Promise<SuccessResponse | FailResponse> => {
    try {
        const response = await axios.post('/api/Auth/verify-resetPassword-otp', {
            email,
            otp
        });
        const result:SuccessResponse = response.data;
        console.log(result);
        return result;
    } catch (error) {
        // Handle API errors
        if (axios.isAxiosError(error)) {
            // If error is an AxiosError, check for response from the API
            const errorData = error.response?.data;

            const result: FailResponse = {
                isSucsess: false,
                status: error.response?.status || 500,
                message: errorData?.message || 'An unexpected error occurred.',
                data: null,
            };


            return result;
        }
        return {
            isSucsess: false,
            status: 500,
            message: 'An unexpected error occurred.',
            data: null,
        };
    }
};
////////////////////////////////////////////////////////////////////////////////////////
export const resetPassword = async ({email,newPassword,otp}: {
    email: string;
    newPassword: string;
    otp: string;

}): Promise<SuccessResponse | FailResponse> => {
    try {
        const response = await axios.post('/api/Auth/reset-password', {
            email,
            newPassword,
            otp
        });
        const result:SuccessResponse = response.data;
        console.log(result);
        return result;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorData = error.response?.data;

            const result: FailResponse = {
                isSucsess: false,
                status: error.response?.status || 500,
                message: errorData?.message || 'An unexpected error occurred.',
                data: null,
            };


            return result;
        }
        return {
            isSucsess: false,
            status: 500,
            message: 'An unexpected error occurred.',
            data: null,
        };
    }
};
