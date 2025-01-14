import { book } from "../shared/models/book.model";

export interface BookApiResponse {
    data: book;
    success: boolean;
    errorMessage: string;
}