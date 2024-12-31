import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const authToken = sessionStorage.getItem('auth-token');
  const router = inject(Router);

  if (authToken && !req.url.includes('login')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        router.navigate(['/']);
      }
      return throwError(() => err);
    })
  );
};
