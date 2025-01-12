import { book } from "../shared/models/book.model";

export interface HomeApiResponse {
    data: book[];
    success: boolean;
    errorMessage: string;
}