import axios, {AxiosError} from 'axios';
import {
    RegisterSuccessResponse,
    RegisterFailResponse,
    FileUploadSuccessResponse, FileUploadFailResponse
} from '@/model/AuthModel/registerModel';
import {RegisterParams} from '@/model/AuthModel/registerModel';
import {ApiResponse, handleApiError, handleApiResponse} from '@/util/apiHandler';


export const register = async ({
                                   email,
                                   password,
                                   fullName,
                                   address,
                                   phoneNumber,
                                   secondaryPhoneNumber,
                                   profilePicture,
                               }: RegisterParams): Promise<RegisterSuccessResponse | RegisterFailResponse> => {
    try {
        // Conditionally include profilePicture only if it's defined
        const requestBody = {
            email,
            password,
            fullName,
            address,
            phoneNumber,
            secondaryPhoneNumber,
            ...(profilePicture && { profilePicture }) // Include profilePicture only if it is defined
        };

        const response = await axios.post('/api/Auth/register', requestBody);

        const result: RegisterSuccessResponse = response.data;
        console.log(result);
        return result;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const errorData = error.response?.data;
            console.log('Request body:', {
                email,
                password,
                fullName,
                address,
                phoneNumber,
                secondaryPhoneNumber,
                profilePicture,
            });

            // Handle image upload errors (if profilePicture is included and upload fails)
            if (errorData && errorData.message) {
                return {
                    data: null,
                    isSucsess: false,
                    status: error.response?.status || 500,
                    message: errorData.message || 'An unexpected error occurred during the file upload or registration.',
                };
            }

            // General error handling for other axios-related issues
            return {
                data: null,
                isSucsess: false,
                status: error.response?.status || 500,
                message: errorData?.message || 'An unexpected error occurred during registration.',
            };
        }

        // Fallback for non-Axios errors
        return {
            data: null,
            isSucsess: false,
            status: 500,
            message: 'An unexpected error occurred.',
        };
    }
};

export const uploadFile = async ({
                                     file,
                                     token,
                                 }: {
    file: File;
    token: string;
}): Promise<FileUploadSuccessResponse | FileUploadFailResponse> => {
    try {
        const formData = new FormData();
        formData.append('formFile', file);

        // Add token to headers if needed
        const headers = {
            'Content-Type': 'multipart/form-data',
        };

        const response = await axios.post(
            '/api/File/uploadFile',
            formData,  // Pass formData instead of file directly
            { headers }
        );

        const result: FileUploadSuccessResponse = {
            success: true,
            status: response.status,
            message: 'File uploaded successfully.',
            data: response.data,
        };

        return result;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorData = error.response?.data;
            const result: FileUploadFailResponse = {
                success: false,
                status: error.response?.status || 500,
                message:
                    errorData?.message ||
                    'An unexpected error occurred during file upload.',
                data: null,
            };
            return result;
        }
        return {
            success: false,
            status: 500,
            message: 'An unexpected error occurred.',
            data: null,
        };
    }
};




export const verifyOtpService = async (
    email: string,
    otp: string
): Promise<ApiResponse<any> | null> => {
    try {
        const response = await axios.post(`/api/Auth/VerifyOTP`, {
            email,
            otp,
        });
        return handleApiResponse<ApiResponse<any>>(response);
    } catch (error) {
        return handleApiError(error as AxiosError);
    }
};
