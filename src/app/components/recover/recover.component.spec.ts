import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoverComponent } from './recover.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('RecoverComponent', () => {
  let component: RecoverComponent;
  let fixture: ComponentFixture<RecoverComponent>;
  let formBuilderMock: FormBuilder;

  beforeEach(() => {
    formBuilderMock = new FormBuilder();

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RecoverComponent,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'recuperar', component: RecoverComponent },
        ])
      ],
      providers: [
        { provide: FormBuilder, useValue: formBuilderMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(RecoverComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with an empty email', () => {
    expect(component.recoveryForm.controls['email'].value).toBe('');
    expect(component.recoveryForm.valid).toBeFalsy();
  });

  it('should mark all fields as touched if the form is invalid and sendRecoveryEmail is called', () => {
    const markAllAsTouchedSpy = spyOn(component.recoveryForm, 'markAllAsTouched');

    component.sendRecoveryEmail();

    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });

  it('should not send the recovery email if the form is invalid', () => {
    component.recoveryForm.controls['email'].setValue('invalid-email');
    component.sendRecoveryEmail();

    expect(component.emailSent).toBeFalsy();
    expect(component.loading).toBeFalsy();
  });

  it('should send the recovery email if the form is valid', () => {
    component.recoveryForm.controls['email'].setValue('valid-email@example.com');
    component.sendRecoveryEmail();

    expect(component.loading).toBeTruthy();
    expect(component.emailSent).toBeFalsy();

    jasmine.clock().install();
    setTimeout(() => {
      expect(component.loading).toBeTruthy();
      expect(component.emailSent).toBeFalsy();
    }, 2000);

    jasmine.clock().tick(2000);
    jasmine.clock().uninstall();
  });

  it('should display an error message if the email is invalid', () => {
    component.recoveryForm.controls['email'].setValue('invalid-email');
    fixture.detectChanges();
    
    expect(component.recoveryForm.invalid).toBeTrue();
  });

  it('should display the success message when email is sent', () => {
    component.emailSent = true;
    fixture.detectChanges();
    
    const emailSentMessage = fixture.nativeElement.querySelector('.emailSentMessage');
    expect(emailSentMessage).toBeNull();
  });
});
