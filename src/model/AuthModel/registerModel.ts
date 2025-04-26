export interface RegisterParams {
    email: string;
    password: string;
    fullName: string;
    address: string;
    phoneNumber: string;
    secondaryPhoneNumber: string;
    profilePicture?: string; // Optional, assuming it could be a string URL or identifier after file upload
}

export interface RegisterSuccessResponse {
    data: boolean;
    isSucsess: true;
    status: number;
    message: string;
}

export interface RegisterFailResponse {
    data: null;
    isSucsess: false;
    status: number;
    message: string;
}
export interface ResponseData {
    data: string;
    message:string;
    status:number;
    success:boolean;
}
export interface FileUploadSuccessResponse {
    success: true;
    status: number;
    message: string;
    data: ResponseData; // You can change this to the actual expected response structure
}

export interface FileUploadFailResponse {
    success: false;
    status: number;
    message: string;
    data: null;
}
