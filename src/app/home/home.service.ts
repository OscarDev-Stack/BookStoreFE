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
  getHomoData() {
    return this.http.get<HomeApiResponse>(this.baseUrl + "Book");
  }
  getHomeSeach(search:string){
    return this.http.get<HomeApiResponse>(this.baseUrl + 'Book/search' + (search === '' ? '' : '?search=' + search ));
    }
}
