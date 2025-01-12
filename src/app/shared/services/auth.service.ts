import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginApiResponse } from '../models/auth.model';
import { catchError, EMPTY } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  private router = inject(Router);
  baseUrl = environment.baseUrl;

  private email = '';
  private name = '';
  private role = '';
  private tokenExpiration = new Date();
  private isLoggedIn = false;

  getEmail() {
    return this.email;
  }
  getName() {
    return this.name;
  }
  getRole() {
    return this.role;
  }
  getTokenExpiration() {
    return this.tokenExpiration;
  }
  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  login(email: string, password: string){
    return this.http.post<LoginApiResponse>(this.baseUrl + 'User/Login', {
      userName: email,
      password
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        alert('Error ' + error.error.errorMessage)
        return EMPTY})
    );
  }
  decodeToken(){
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if (!token || !tokenExpiration) return;
    
    const jwt_Decode = jwtDecode<any>(token);
    this.role =
    jwt_Decode[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ];

  this.email =
  jwt_Decode[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
    ];

  this.name =
  jwt_Decode['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

  this.tokenExpiration = new Date(tokenExpiration);

  this.isLoggedIn = true;

  }
  logout() {
    localStorage.clear();
    this.email = '';
    this.name = '';
    this.role = '';
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
