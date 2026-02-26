import { CanActivateFn } from '@angular/router';
import { AuthStateService } from '../services/auth-state.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthStateService);
  const router = inject(Router);
  if(auth.isLoggedIn()){
    return true;
  }

 return router.parseUrl('/login'); 
};
