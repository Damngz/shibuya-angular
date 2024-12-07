import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should log in a user and store the user in localStorage', () => {
    const mockUser: User = {
      userId: 123,
      name: 'Test',
      lastNames: 'User',
      phone: '123456789',
      city: 'Test City',
      address: 'Test Address',
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
    };
    const credentials = { email: 'test@example.com', password: 'password123' };

    service.login(credentials.email, credentials.password).subscribe((success) => {
      expect(success).toBeTrue();
      expect(localStorage.getItem('currentUser')).toBe(JSON.stringify(mockUser));
    });

    const req = httpMock.expectOne('http://localhost:8080/users/login');
    expect(req.request.method).toBe('POST');
    req.flush({ data: mockUser });
  });

  it('should handle login failure gracefully', () => {
    service.login('invalid@example.com', 'wrongpassword').subscribe((success) => {
      expect(success).toBeFalse();
    });

    const req = httpMock.expectOne('http://localhost:8080/users/login');
    expect(req.request.method).toBe('POST');
    req.flush({}, { status: 401, statusText: 'Unauthorized' });
  });

  it('should log out the user and clear localStorage', () => {
    localStorage.setItem('currentUser', JSON.stringify({ userId: 123 }));

    service.logout();

    expect(localStorage.getItem('currentUser')).toBeNull();
    expect(service.getCurrentUser()).toBeNull();
  });

  it('should register a new user', () => {
    const newUser: User = {
      userId: 123,
      name: 'New',
      lastNames: 'User',
      phone: '987654321',
      city: 'New City',
      address: 'New Address',
      email: 'new@example.com',
      password: 'newpassword123',
      role: 'user',
    };

    service.register(newUser).subscribe((user) => {
      expect(user).toEqual(newUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/users');
    expect(req.request.method).toBe('POST');
    req.flush({ data: newUser });
  });

  it('should handle registration failure gracefully', () => {
    const newUser: User = {
      userId: 0,
      name: 'Invalid',
      lastNames: 'User',
      phone: '000000000',
      city: 'Invalid City',
      address: 'Invalid Address',
      email: 'invalid@example.com',
      password: 'invalidpassword123',
      role: 'user',
    };

    service.register(newUser).subscribe({
      next: () => fail('Expected an error'),
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });

    const req = httpMock.expectOne('http://localhost:8080/users');
    req.flush({}, { status: 400, statusText: 'Bad Request' });
  });

  it('should update the user profile', () => {
    const updatedUser: User = {
      userId: 123,
      name: 'Updated',
      lastNames: 'User',
      phone: '123456789',
      city: 'Updated City',
      address: 'Updated Address',
      email: 'updated@example.com',
      password: 'updatedpassword123',
      role: 'user',
    };

    service.updateProfile(updatedUser).subscribe((user) => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/users/123');
    expect(req.request.method).toBe('PUT');
    req.flush({ data: updatedUser });
  });

  it('should retrieve the current user from localStorage', () => {
    const mockUser: User = {
      userId: 123,
      name: 'Test',
      lastNames: 'User',
      phone: '123456789',
      city: 'Test City',
      address: 'Test Address',
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
    };
    localStorage.setItem('currentUser', JSON.stringify(mockUser));

    const currentUser = service.getCurrentUser();

    expect(currentUser).toEqual(mockUser);
  });

  it('should return true if the user is logged in', () => {
    localStorage.setItem('currentUser', JSON.stringify({ userId: 123 }));

    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false if the user is not logged in', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });
});
