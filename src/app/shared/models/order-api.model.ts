import { order, OrdersDNI } from "./order.model";

export interface OrderPostApiResponse {
    data: number,
    success: boolean,
    errorMessage: string
}

export interface OrdersApiResponse {
    data: order[],
    success: boolean,
    errorMessage: string
}

export interface OrderApiResponse {
    data: order,
    success: boolean,
    errorMessage: string
}

export interface OrderApiResp {
    success: boolean,
    errorMessage: string
}

export interface OrderInfoApiResponse {
    data: OrdersDNI[],
    success: boolean,
    errorMessage: string
}
