import axios from 'axios';
import {LoginSuccessResponse, LoginFailResponse, DeactivateResponse} from '@/model/AuthModel/loginModel';

export const signIn = async ({deviceId,email, password,}: {
    deviceId: string;
    email: string;
    password: string;
}): Promise<LoginSuccessResponse | LoginFailResponse> => {
    try {
        const response = await axios.post('/api/Auth/company/login', {
            deviceId,
            email,
            password,
        });
        const result: LoginSuccessResponse = response.data;
        console.log(result);
        return result;
    } catch (error) {
        // Handle API errors
        if (axios.isAxiosError(error)) {
            // If error is an AxiosError, check for response from the API
            const errorData = error.response?.data;

            const result: LoginFailResponse = {
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

//////////////////////////////////////////////////////
export const deactivateDevice = async (deviceId: string): Promise<DeactivateResponse> => {
    try {
        const response = await axios.post(`/api/Device/DeactivateDevice/${deviceId}`);
        return {
            isSuccess: true,
            status: response.status,
            message: 'Device deactivated successfully.',
            data: response.data,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorData = error.response?.data;
            return {
                isSuccess: false,
                status: error.response?.status || 500,
                message: errorData?.message || 'An unexpected error occurred.',
                data: null,
            };
        }
        return {
            isSuccess: false,
            status: 500,
            message: 'An unexpected error occurred.',
            data: null,
        };
    }
};












