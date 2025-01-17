import { book } from "./book.model";
import { customer } from "./customer.model";

export interface order{
    id: number,
    startDate: string,
    endDate: string,
    finalized: boolean,
    customerId: number,
    operationNumbre: string,
    customer: customer,
    status: boolean

}
export interface OrdersDNI {
    id: number,
    dateStar: string,
    timeStar:string,
    dateEnd: string, 
    timeEnd: string,
    finalized: string, 
    operationNumbre: string,
    customerId: number,
    fullName: string,
    dni: string,
    edad: number,
    books: book[]
}