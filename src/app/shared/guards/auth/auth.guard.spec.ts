import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { authGuard } from './auth.guard';


describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow navigation if user is admin', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    const currentUser = { role: 'ADMIN' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(currentUser));

    const canActivate = authGuard(route, state);

    expect(canActivate).toBe(true);
  });

  it('should allow navigation if user is user', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    const currentUser = { role: 'USER' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(currentUser));

    const canActivate = authGuard(route, state);

    expect(canActivate).toBe(true);
  });

  it('should not allow navigation if user role is unknown', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    const currentUser = { role: 'UNKNOWN' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(currentUser));

    const canActivate = authGuard(route, state);

    expect(canActivate).toBe(false);
  });

  it('should not allow navigation if user is not logged in', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const canActivate = authGuard(route, state);

    expect(canActivate).toBe(false);
  });
});
