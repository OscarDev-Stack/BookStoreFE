import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OrderApiResp, OrderApiResponse, OrderInfoApiResponse, OrderPostApiResponse, OrdersApiResponse } from '../models/order-api.model';
import { catchError, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  http = inject(HttpClient);
  baseUrl = environment.baseUrl;
  
  postOrder(Order: FormData ){
    return this.http.post<OrderPostApiResponse>(this.baseUrl + 'Orders', Order).pipe(
      catchError((error: HttpErrorResponse) => {
        alert('Error ' + error.error.errorMessage)
        return EMPTY
      })
    );
  }
  getOrders(){
    return this.http.get<OrdersApiResponse>(this.baseUrl + 'Orders').pipe(
      catchError((error: HttpErrorResponse) => {
        alert('Error ' + error.error.errorMessage)
        return EMPTY
      })
    );
  }
  getOrder(idOrder: string){
    return this.http.get<OrderApiResponse>(this.baseUrl + 'Orders/id?id=' + idOrder).pipe(
      catchError((error: HttpErrorResponse) => {
        alert('Error ' + error.error.errorMessage)
        return EMPTY
      })
    );
  }
  putFinalize(idOrder: string){
    return this.http.put<OrderApiResp>(this.baseUrl + 'Orders/id?id=' + idOrder, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        alert('Error ' + error.error.errorMessage)
        return EMPTY
      })
    );
  }
  getOrdersDNI(dni: string){
    return this.http.get<OrderInfoApiResponse>(this.baseUrl + 'Orders/dni?dni=' + dni).pipe(
      catchError((error: HttpErrorResponse) => {
        alert('Error ' + error.error.errorMessage)
        return EMPTY
      })
    );
  }
}
