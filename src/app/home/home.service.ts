import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HomeApiResponse } from './homo-model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  http = inject(HttpClient);
  baseUrl = environment.baseUrl;
  getHomoData(Page: number, RecordsPerPage: number) {
    return this.http.get<HomeApiResponse>(this.baseUrl + "Book?Page=" + Page + '&RecordsPerPage=' + RecordsPerPage, { observe: 'response'});
  }
  getHomeSeach(search:string, Page: number, RecordsPerPage: number){
    return this.http.get<HomeApiResponse>(this.baseUrl + 'Book/search?search=' + search + "&Page=" + Page + '&RecordsPerPage=' + RecordsPerPage, { observe: 'response'});
    //return this.http.get<HomeApiResponse>(this.baseUrl + 'Book/search' + (search === '' ? '' : '?search=' + search ) + '', { observe: 'response'});
    }
}
