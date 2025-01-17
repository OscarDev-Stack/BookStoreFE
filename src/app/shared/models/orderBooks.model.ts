import { book } from "./book.model";
import { order } from "./order.model";

export interface OrderBooks{
    id: number,
    bookId: number,
    orderId: number,
    book: book,
    order: order,
    status: boolean
}