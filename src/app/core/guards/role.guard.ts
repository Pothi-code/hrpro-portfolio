import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStateService } from '../services/auth-state.service';
import { Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const authstate = inject(AuthStateService);
  const router = inject(Router);
  const expectedRole = route.data?.['role'];
  if(!authstate.isLoggedIn()){
    return router.createUrlTree(['/login']);
  }
  if(authstate.role()!==expectedRole)
  {
    return router.createUrlTree(['/dashboard'])

  }

  return true;
};
