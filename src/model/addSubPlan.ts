
// User model representing the logged-in user
export interface Data{
    companySubscriptionId:number;
    clientKey: string;

}


export interface AddSubPlanSuccessResponse {

    Sucsess: true;
    status: number;
    message: string;
    data: Data;
}

export interface AddSubPlanFailResponse {
    Sucsess: false;
    status: number;
    message: string;
    data: null;
}
