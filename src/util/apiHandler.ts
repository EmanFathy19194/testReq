import axios, { AxiosError, AxiosResponse } from "axios";

// Define the standard API Response interface
export interface ApiResponse<T> {
  data: T | null;
  isSucsess: boolean;
  status: number;
  errorCode: number;
  message: string;
}

// Helper function to process API responses
export const handleApiResponse = <T>(
    response: AxiosResponse<ApiResponse<T>>
): T | null => {
  if (response.data.isSucsess) {
    return response.data.data; // Return the data if the request was successful
  } else {
    throw new Error(response.data.message || "Unknown error occurred");
  }
};
// Helper function to handle API errors
export const handleApiError = (error: AxiosError): null => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.log("API Error Response:", error.response.data);
    console.log("API Error Status:", error.response.status);
    console.log("API Error Headers:", error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.log("API Error Request:", error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("API Error Message:", error.message);
  }
  return null; // Return null to indicate failure
};
