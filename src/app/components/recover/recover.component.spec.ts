import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RecoverComponent } from './recover.component';
import { By } from '@angular/platform-browser';

describe('RecoverComponent', () => {
  let component: RecoverComponent;
  let fixture: ComponentFixture<RecoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule, RecoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with email control', () => {
    expect(component.recoveryForm.contains('email')).toBeTruthy();
  });

  it('should make the email control required', () => {
    let control = component.recoveryForm.get('email');
    control?.setValue('');
    expect(control?.invalid).toBeTruthy();
  });

  it('should disable the submit button while loading', () => {
    component.loading = true;
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should display the loading spinner while loading', () => {
    component.loading = true;
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner).not.toBeNull();
  });

  it('should set emailSent to true after sending recovery email', () => {
    component.recoveryForm.setValue({ email: 'test@example.com' });
    component.sendRecoveryEmail();
    expect(component.loading).toBeTrue();
    
    setTimeout(() => {
      expect(component.loading).toBeFalse();
      expect(component.emailSent).toBeTrue();
    }, 2000);
  });
});
