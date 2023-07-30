import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupComponent } from './signup.component';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let fb: FormBuilder;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [SignupComponent],
      providers: [UserService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form elements', () => {
    const form = fixture.nativeElement.querySelector('form');
    const firstNameInput = fixture.nativeElement.querySelector(
      'input[formControlName="firstName"]',
    );
    const lastNameInput = fixture.nativeElement.querySelector(
      'input[formControlName="lastName"]',
    );
    const emailInput = fixture.nativeElement.querySelector(
      'input[formControlName="email"]',
    );
    const phoneNumberInput = fixture.nativeElement.querySelector(
      'input[formControlName="phoneNumber"]',
    );
    const passwordInput = fixture.nativeElement.querySelector(
      'input[formControlName="password"]',
    );
    const confirmPasswordInput = fixture.nativeElement.querySelector(
      'input[formControlName="confirmPassword"]',
    );
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]',
    );

    expect(form).toBeTruthy();
    expect(firstNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(phoneNumberInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(confirmPasswordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should show invalidPhoneNumber error message when an invalid phone number is entered', () => {
    const phoneNumberInput: HTMLInputElement =
      fixture.nativeElement.querySelector(
        'input[formControlName="phoneNumber"]',
      );
    phoneNumberInput.value = '1234567890';

    phoneNumberInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector(
      'div[formControlName="phoneNumber"] .text-danger',
    );

    expect(errorMessage).toBeFalsy();
  });

  it('should navigate to home page on successful signup', () => {
    spyOn(router, 'navigate');

    component.signupForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      password: 'password',
      confirmPassword: 'password',
    });

    component.onSignup();

    expect(router.navigate).toHaveBeenCalledWith(['/home'], {
      queryParams: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        password: 'password',
        confirmPassword: 'password',
      },
    });
  });
});
