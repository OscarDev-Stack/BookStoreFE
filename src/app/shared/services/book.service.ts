import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BookApiResp, BookApiResponse, BookPostApiResponse } from '../models/book-api-model';
import { catchError, EMPTY } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  http = inject(HttpClient);
  baseUrl = environment.baseUrl;

  getBook(id: string){
      return this.http.get<BookApiResponse>(this.baseUrl + 'Book/' + id).pipe(
        catchError((error: HttpErrorResponse) => {
          alert('Error ' + error.error.errorMessage)
          return EMPTY})
      );
    }

    postBook(book: FormData){
      return this.http.post<BookPostApiResponse>(this.baseUrl + 'Book', book)
      .pipe(
        catchError((error: HttpErrorResponse) => {
        alert('Error ' + error.error.errorMessage)
        return EMPTY})
      );
    }

    putBook(book: FormData, idBook: string){
      return this.http.put<BookApiResp>(this.baseUrl + 'Book/' + idBook, book)
      .pipe(
        catchError((error: HttpErrorResponse) => {
        alert('Error ' + error.error.errorMessage)
        return EMPTY})
      );
    }
  
    deleteBook(idBook: string){
      return this.http.delete<BookApiResp>(this.baseUrl + 'Book/' + idBook)
      .pipe(
        catchError((error: HttpErrorResponse) => {
        alert('Error ' + error.error.errorMessage)
        return EMPTY})
      );
    }

}
