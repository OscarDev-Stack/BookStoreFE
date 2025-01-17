import { OrderBooks } from "./orderBooks.model";

export interface OrderBookPostApiResponse{
    data: number,
    success: boolean,
    errorMessage: string
}
export interface OrderBooksApiResponse {
    data: OrderBooks[],
    success: boolean,
    errorMessage: string
}