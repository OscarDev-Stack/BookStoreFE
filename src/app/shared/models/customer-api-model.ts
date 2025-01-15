import { customer } from "./customer.model";

export interface CustomersApiResponse {
    data: customer[];
    success: boolean;
    errorMessage: string;
}
export interface CustomerPostApiResponse{
    data: number;
    success: boolean;
    errorMessage: string;
}
export interface CustomerApiResponse{
    data: customer;
    success: boolean;
    errorMessage: string;
}
export interface CustomerApiResp{
    
}