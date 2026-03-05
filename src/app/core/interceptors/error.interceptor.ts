import { HttpInterceptorFn } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('🔥 ERROR INTERCEPTOR ACTIVE');

  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error) => {

      let message = 'Something went wrong';

      if (error.status === 0) {
        message = 'Cannot connect to server';
      }

      if (error.status === 404) {
        message = 'Resource not found';
      }

      if (error.status === 500) {
        message = 'Server error occurred';
      }

      if (error.error?.message) {
        message = error.error.message;
      }

      snackBar.open(message, 'Close', {
        duration: 3000
      });

      return throwError(() => error);
    })
  );
};
