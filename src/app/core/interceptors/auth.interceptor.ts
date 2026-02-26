import { HttpInterceptorFn, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStateService } from '../services/auth-state.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authState = inject(AuthStateService);
  const router = inject(Router);
  const http = inject(HttpClient);

  const token = authState.token();

  const authReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    : req;

  return next(authReq).pipe(
    catchError(error => {

      // ✅ If token expired
      if (error.status === 401) {

        const refreshToken = authState.refreshToken();

        // ❌ No refresh token → logout
        if (!refreshToken) {
          authState.logout();
          router.navigate(['/login']);
          return throwError(() => error);
        }

        //  Call refresh token API
        return http.post<any>('/auth/refresh', {
          refresh_token: refreshToken
        }).pipe(
          switchMap(response => {

            //  Save new tokens
            authState.setTokens(
              response.access_token,
              response.refresh_token
            );

            //  Retry original request with new token
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.access_token}`
              }
            });

            return next(retryReq);
          }),
          catchError(() => {
            authState.logout();
            router.navigate(['/login']);
            return throwError(() => error);
          })
        );
      }

      return throwError(() => error);
    })
  );
};