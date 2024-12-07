import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';

class AuthServiceMock {
  login(email: string, password: string) {
    return of(true);
  }

  isLoggedIn() {
    return true;
  }

  getCurrentUser() {
    return { userId: 1, email: 'test@example.com' };
  }

  logout() {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthServiceMock;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [LoginComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useClass: AuthServiceMock },
        Router
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call isLoggedIn and navigate to home if logged in', () => {
    const navigateSpy = spyOn(router, 'navigate');
    
    component.ngOnInit();

    expect(authService.isLoggedIn()).toBeTrue();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should call login method of AuthService when the form is valid', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'validPassword123'
    });

    spyOn(authService, 'login').and.returnValue(of(true));
    component.login();
    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'validPassword123');
  });

  it('should navigate to home page after successful login', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'validPassword123'
    });
    spyOn(authService, 'login').and.returnValue(of(true));
    component.login();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should display invalid credentials message when login fails', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'validPassword123'
    });
    spyOn(authService, 'login').and.returnValue(of(false));
    component.login();
    fixture.detectChanges();
    const invalidCredMessage = fixture.debugElement.query(By.css('.text-danger')).nativeElement;
    expect(invalidCredMessage.textContent).toContain('Credenciales inválidas');
  });

  it('should set loading to true when submitting the form', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'validPassword123'
    });
    spyOn(authService, 'login').and.returnValue(of(true));
    component.login();
    expect(component.loading).toBeTrue();
  });

  it('should disable submit button when form is invalid or loading', () => {
    const submitButton = fixture.debugElement.query(By.css('button')).nativeElement;

    component.loginForm.setValue({
      email: '',
      password: 'validPassword123'
    });
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTrue();

    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'validPassword123'
    });
    component.loading = true;
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTrue();

    component.loading = false;
    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalse();
  });
});
