import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

class MockAuthService {
  getCurrentUser() {
    return { 
      name: 'John', 
      lastNames: 'Doe', 
      phone: '123456789', 
      city: 'Sample City', 
      address: '123 Sample St', 
      email: 'john.doe@example.com' 
    };
  }

  updateProfile(user: any) {
    return of(user);
  }

  logout() {}
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockAuthService: MockAuthService;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ProfileComponent,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'perfil', component: ProfileComponent },
        ]),
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthService); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the profile form with current user data', () => {
    expect(component.profileForm.value.name).toBe('John');
    expect(component.profileForm.value.last_names).toBe('Doe');
    expect(component.profileForm.value.phone).toBe('123456789');
    expect(component.profileForm.value.city).toBe('Sample City');
    expect(component.profileForm.value.address).toBe('123 Sample St');
    expect(component.profileForm.value.email).toBe('john.doe@example.com');
  });

  it('should call toggleEdit to enable editing', () => {
    component.toggleEdit();
    expect(component.editing).toBeTrue();
    expect(component.profileForm.enabled).toBeTrue();
  });

  it('should call saveChanges and update user data when the form is valid', () => {
    spyOn(mockAuthService, 'updateProfile').and.callThrough();
    component.profileForm.setValue({
      name: 'Updated Name',
      last_names: 'Updated Last Name',
      phone: '987654321',
      city: 'Updated City',
      address: '321 Updated St',
      email: 'updatedemail@example.com'
    });
    expect(component.profileForm.valid).toBeTrue();
    component.saveChanges();
    
    expect(mockAuthService.updateProfile).toHaveBeenCalledWith({
      name: 'Updated Name',
      lastNames: 'Updated Last Name',
      phone: '987654321',
      city: 'Updated City',
      address: '321 Updated St',
      email: 'updated.email@example.com'
    });
    expect(component.editing).toBeFalse();
    expect(component.profileForm.disabled).toBeTrue();
  });

  it('should show validation errors if the form is invalid and save is clicked', () => {
    spyOn(component.profileForm, 'markAllAsTouched');
    component.saveChanges();
    expect(component.profileForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should logout and redirect to home', () => {
    spyOn(mockAuthService, 'logout').and.callThrough();
    spyOn(mockRouter, 'navigate');
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
