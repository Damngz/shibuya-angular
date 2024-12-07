import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersComponent } from './users.component';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

class MockUserService {
  getUsers() {
    return of([{ id: 1, name: 'Test User' }]);
  }

  deleteUser(userId: number) {
    return of(userId);
  }
}

class MockAuthService {
  getCurrentUser() {
    return { id: 1, name: 'Test User' };
  }
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let mockUserService: MockUserService;
  let mockAuthService: MockAuthService;
  let mockRouter: Router;

  beforeEach(() => {
    mockUserService = new MockUserService();
    mockAuthService = new MockAuthService();

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        UsersComponent,
        ReactiveFormsModule,
        CommonModule,
        RouterTestingModule
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService },
      ]
    });

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    spyOn(mockRouter, 'navigate');
    fixture.detectChanges();
  });

  it('should load users on initialization', () => {
    expect(component.users.length).toBeGreaterThan(0);
    expect(component.users[0].name).toBe('Test User');
  });

  it('should call loadUsers method when component initializes', () => {
    const loadUsersSpy = spyOn(component, 'loadUsers').and.callThrough();
    component.ngOnInit();
    expect(loadUsersSpy).toHaveBeenCalled();
  });

  it('should navigate to add-user page when addUser is called', () => {
    component.addUser();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/add-user']);
  });

  it('should navigate to edit-user page when editUser is called', () => {
    component.editUser(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit-user/1']);
  });

  it('should delete user and reload users list when deleteUser is called', (done) => {
    const userId = 1;
    const loadUsersSpy = spyOn(component, 'loadUsers').and.callThrough();

    component.deleteUser(userId);

    setTimeout(() => {
      expect(loadUsersSpy).toHaveBeenCalled();
      done();
    }, 1000);
  });

  it('should not delete user if userId is undefined', () => {
    const deleteUserSpy = spyOn(mockUserService, 'deleteUser');
    component.deleteUser(undefined);
    expect(deleteUserSpy).not.toHaveBeenCalled();
  });
});
