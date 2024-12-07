import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [RegisterComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        {
          provide: AuthService,
          useValue: { register: jasmine.createSpy('register').and.returnValue(of(true)) }
        },
        Router
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the RegisterComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the register form', () => {
    expect(component.registerForm).toBeTruthy();
    expect(component.registerForm.get('name')).toBeTruthy();
    expect(component.registerForm.get('email')).toBeTruthy();
    expect(component.registerForm.get('password')).toBeTruthy();
  });

  it('should display error message when name is not provided', () => {
    const nameControl = component.registerForm.get('name');
    nameControl?.setValue('');
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.text-danger')).nativeElement;
    expect(errorMessage.textContent).toContain('Por favor, ingresa tu nombre.');
  });

  it('should call register method of AuthService when the form is valid', () => {
    component.registerForm.setValue({
      name: 'José Miguel',
      last_names: 'Rojas Pérez',
      phone: '984948321',
      city: 'Osorno',
      address: 'Av. las condes 183',
      email: 'ejemplo@gmail.com',
      password: 'Password123',
      role: 'user'
    });
    component.onSubmit();
    expect(authService.register).toHaveBeenCalledWith(component.registerForm.value);
  });

  it('should navigate to home page after successful registration', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.registerForm.setValue({
      name: 'José Miguel',
      last_names: 'Rojas Pérez',
      phone: '984948321',
      city: 'Osorno',
      address: 'Av. las condes 183',
      email: 'ejemplo@gmail.com',
      password: 'Password123',
      role: 'user'
    });
    component.onSubmit();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should mark all fields as touched if the form is invalid', () => {
    component.onSubmit();
    expect(component.registerForm.get('name')?.touched).toBeTrue();
    expect(component.registerForm.get('email')?.touched).toBeTrue();
    expect(component.registerForm.get('password')?.touched).toBeTrue();
  });

  it('should validate the password with the custom validator', () => {
    const password = component.registerForm.get('password');
    password?.setValue('Password123');
    expect(password?.valid).toBeTrue();
  });
});
