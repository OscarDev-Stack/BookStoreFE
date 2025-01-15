import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CustomerApiResp, CustomerApiResponse, CustomerPostApiResponse, CustomersApiResponse } from '../models/customer-api-model';
import { catchError, EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);
  router = inject(Router);
  baseUrl = environment.baseUrl;

  getCustomers(){
      return this.http.get<CustomersApiResponse>(this.baseUrl + 'Customer').pipe(
        catchError((error: HttpErrorResponse) => {
          alert('Error ' + error.error.errorMessage)
          //this.router.navigate(['/']); 
          return EMPTY})
      );
    }
    postCustomer(firstName: string, lastName: string, dni: string, edad: number ){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer your-token-here'});
      return this.http.post<CustomerPostApiResponse>(this.baseUrl + 'Customer',{
        firstName,
        lastName,
        dni,
        edad,
        status: true
      }, { headers }).pipe(
        catchError((error: HttpErrorResponse) => {
          alert('Error ' + error.error.errorMessage)
          //this.router.navigate(['/']); 
          return EMPTY})
      );
    }
    getCustomer(id: string){
      return this.http.get<CustomerApiResponse>(this.baseUrl + 'Customer/' + id).pipe(
        catchError((error: HttpErrorResponse) => {
          alert('Error ' + error.error.errorMessage)
          //this.router.navigate(['/']); 
          return EMPTY})
      );
    }
    putCustomer(firstName: string, lastName: string, dni: string, edad: number, idCustomer: string){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer your-token-here'});
      return this.http.put<CustomerApiResp>(this.baseUrl + 'Customer/' + idCustomer, {
        firstName,
        lastName,
        dni,
        edad,
        status: true
      }, { headers }).pipe(
        catchError((error: HttpErrorResponse) => {
          alert('Error ' + error.error.errorMessage)
          //this.router.navigate(['/']); 
          return EMPTY})
      );
    }
    deleteCustomer(id: string){
      return this.http.delete<CustomerApiResp>(this.baseUrl + 'Customer/' + id).pipe(
        catchError((error: HttpErrorResponse) => {
          alert('Error ' + error.error.errorMessage)
          //this.router.navigate(['/']); 
          return EMPTY})
      );
    }
    getFullNameCustomer(fullName: string){
      return this.http.get<CustomersApiResponse>(this.baseUrl + 'Customer/fullName?fullName=' + fullName).pipe(
        catchError((error: HttpErrorResponse) => {
          alert('Error ' + error.error.errorMessage)
          //this.router.navigate(['/']); 
          return EMPTY})
      );
    }
    getDNICustomer(DNI: string){
      return this.http.get<CustomersApiResponse>(this.baseUrl + 'Customer/DNI?dni=' + DNI).pipe(
        catchError((error: HttpErrorResponse) => {
          alert('Error ' + error.error.errorMessage)
          //this.router.navigate(['/']); 
          return EMPTY})
      );
    }
}
