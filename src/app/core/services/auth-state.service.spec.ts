import { TestBed } from '@angular/core/testing';

import { AuthStateService } from './auth-state.service';

describe('AuthStateService', () => {
  let service: AuthStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should login user',()=>{
    const service = TestBed.inject(AuthStateService);
    const mockUser = {
      id:1,
      email:'admin@example.com',
      role:'admin',
      name:'Andrew'
    };
    expect(service.isLoggedIn()).toBeTruthy;
    expect(service.role).toBe('admin');
  });
});
