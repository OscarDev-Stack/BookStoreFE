import { book } from "./book.model";

export interface BookApiResponse {
    data: book,
    success: boolean,
    errorMessage: string,
}

export interface BookPostApiResponse {
    data: number,
    success: boolean,
    errorMessage: string,
}

export interface BookApiResp{
    success: boolean,
    errorMessage: string,
}