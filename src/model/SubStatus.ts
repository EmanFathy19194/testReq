export interface Data {
    isActive:boolean;
}
export interface CompanySubscriptionStatusResponse {
    success: boolean;
    status: number;
    message: string;
    data: Data;
}

// Interface for the error response structure
export interface CompanySubscriptionStatusError {
    success: boolean;
    status: number;
    message: string;
    data: Data; // or can be a more specific error structure
}