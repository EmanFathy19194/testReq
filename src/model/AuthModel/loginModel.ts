
// User model representing the logged-in user
export interface User {
    id: string;
    userName: string;
    email: string;
}

// The response data structure when the login is successful
export interface LoginResponseData {
    isSubscribed: boolean;
    token: string;
    user: User;
    profilePicture: string | null;
    secondaryPhoneNumber: number;
    phoneNumber: number;
    address: string | null;
    message: string | null;
}

// Login success response
export interface LoginSuccessResponse {
    data: LoginResponseData;
    isSucsess: true;
    status: number;
    message: string;
}

// Login failure response
export interface LoginFailResponse {
    data: null;
    isSucsess: false;
    status: number;
    message: string;
}
export interface DeactivateResponse {
    isSuccess: boolean;
    status: number;
    message: string;
    data: any; // Replace `any` with actual data type if known
}
