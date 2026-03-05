import { HttpInterceptorFn, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStateService } from '../services/auth-state.service';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authState = inject(AuthStateService);
  const router = inject(Router);
  const http = inject(HttpClient);

  // Skip refresh endpoint
  if (req.url.includes('/auth/refresh')) {
    return next(req);
  }

  const token = authState.token();

  const authReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    : req;

  return next(authReq).pipe(
    catchError(error => {

      if (error.status !== 401) {
        return throwError(() => error);
      }

      const refreshToken = authState.refreshToken();

      if (!refreshToken) {
        authState.logout();
        router.navigate(['/login']);
        return throwError(() => error);
      }

      // 🟢 If refresh already running → queue this request
      if (isRefreshing) {
        return refreshTokenSubject.pipe(
          filter(token => token !== null),
          take(1),
          switchMap(newToken => {
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` }
            });
            return next(retryReq);
          })
        );
      }

      // 🔵 Start refresh process
      isRefreshing = true;
      refreshTokenSubject.next(null);

      return http.post<any>('/auth/refresh', {
        refresh_token: refreshToken
      }).pipe(
        switchMap(response => {

          isRefreshing = false;

          authState.setTokens(
            response.access_token,
            response.refresh_token
          );

          refreshTokenSubject.next(response.access_token);

          const retryReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.access_token}`
            }
          });

          return next(retryReq);
        }),
        catchError(refreshError => {

          isRefreshing = false;

          authState.logout();
          router.navigate(['/login']);

          return throwError(() => refreshError);
        })
      );
    })
  );
};