import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { OrderBookPostApiResponse, OrderBooksApiResponse } from '../models/orderBooks-api.model';
import { catchError, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderBooksService {
  http = inject(HttpClient);
  baseUrl = environment.baseUrl;
  
  postOrderBook(OrderBook: FormData ){
      return this.http.post<OrderBookPostApiResponse>(this.baseUrl + 'OrderBook', OrderBook).pipe(
        catchError((error: HttpErrorResponse) => {
          alert('Error ' + error.error.errorMessage)
          return EMPTY})
      );
    }
  getOrderBook(id: number){
    return this.http.get<OrderBooksApiResponse>(this.baseUrl + 'OrderBook/orderId?orderId=' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        alert('Error ' + error.error.errorMessage)
        return EMPTY})
    );
  }
}
