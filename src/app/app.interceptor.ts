import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let clonedRequest = req.clone();
  const token = localStorage.getItem('token');
  if (token) {
    clonedRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token).set('Content-Type','application/json'),
    });
  }
  return next(clonedRequest);
};

export const tokenExpiredInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  if (tokenExpiration) {
    const expirationDate = new Date(tokenExpiration);
    const currentDate = new Date();
    if (currentDate > expirationDate) {
      localStorage.clear();
      alert("Sesión expirada");
      // inject(NotificationsService).warn(
      //   'Sesión expirada',
      //   'Por favor inicia sesión de nuevo'
      // );
      inject(Router).navigate(['/login']);
      return EMPTY;
    }
  }
  return next(req);
};

// export const errorInterceptor: HttpInterceptorFn = (req, next) => {
//   const notifications = inject(NotificationsService);
//   return next(req).pipe(
//     catchError((error: HttpErrorResponse) => {
//       notifications.error('Error', error.error.errorMessage);
//       return EMPTY;
//     })
//   );
// };

// export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
//   const spinner = inject(NgxSpinnerService);
//   spinner.show();
//   return next(req).pipe(
//     finalize(() => {
//       spinner.hide();
//     })
//   );
// };