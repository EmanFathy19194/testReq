

export interface SuccessResponse {
    data:true;
    isSucsess: true;
    status: number;
    message: string;
}

export interface FailResponse {
    data: null;
    isSucsess: false;
    status: number;
    message: string;
}
