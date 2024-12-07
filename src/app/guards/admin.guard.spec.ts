import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AuthService } from '../services/auth.service';

class MockAuthService {
  getCurrentUser(type: string) {
    if (type === 'admin') return { role: 'admin' };
    if (type === 'user') return { role: 'user' };
    return null;
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let authService: MockAuthService;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    });

    guard = TestBed.inject(AdminGuard);
    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
    router = TestBed.inject(Router) as unknown as MockRouter;
  });

  it('should allow access if the user is admin', () => {
    spyOn(authService, 'getCurrentUser').and.returnValue({ role: 'admin' });

    const result = guard.canActivate();

    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should deny access and navigate to home if the user is not admin', () => {
    spyOn(authService, 'getCurrentUser').and.returnValue({ role: 'user' });

    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should deny access and navigate to home if no user is logged in', () => {
    spyOn(authService, 'getCurrentUser').and.returnValue(null);

    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
