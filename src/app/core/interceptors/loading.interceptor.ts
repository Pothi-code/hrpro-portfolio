import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  if(req.url.includes('/auth/refresh')){
    return next(req);
  }
  return next(req).pipe(
    finalize(() => {
      loadingService.hide();     //finalize runs on error, cancellation,success
    })
  );
};