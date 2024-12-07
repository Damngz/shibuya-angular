import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
    { userId: 1, name: 'John', lastNames: 'Doe', phone: '1234567890', city: 'City A', address: '123 Street', email: 'john.doe@example.com', password: 'password123', role: 'admin' },
    { userId: 2, name: 'Jane', lastNames: 'Smith', phone: '0987654321', city: 'City B', address: '456 Avenue', email: 'jane.smith@example.com', password: 'password456', role: 'user' }
  ];

  const mockUser: User = { userId: 1, name: 'John', lastNames: 'Doe', phone: '1234567890', city: 'City A', address: '123 Street', email: 'john.doe@example.com', password: 'password123', role: 'admin' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:8080/users');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockUsers });
  });

  it('should get a user by id', () => {
    const userId = 1;

    service.getUserById(userId).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`http://localhost:8080/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockUser });
  });

  it('should add a new user', () => {
    service.addUser(mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/users');
    expect(req.request.method).toBe('POST');
    req.flush({ data: mockUser });
  });

  it('should update an existing user', () => {
    const userId = 1;

    service.updateUser(userId, mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`http://localhost:8080/users/${userId}`);
    expect(req.request.method).toBe('PUT');
    req.flush({ data: mockUser });
  });

  it('should delete a user', () => {
    const userId = 1;

    service.deleteUser(userId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`http://localhost:8080/users/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
