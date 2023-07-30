import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { UserService } from '../user.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create a spy object for the UserService
    const userServiceSpy = jasmine.createSpyObj<UserService>('UserService', [
      'getUserByEmail',
    ]);

    const routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>; // Inject the UserService spy using TestBed.inject()
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show required error message for email field when form is submitted with empty email', () => {
    const emailInput = component.loginForm.get('email');
    emailInput.setValue('');
    emailInput.markAsTouched();
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.text-danger');
    expect(errorMessage.textContent).toContain('Please enter a valid email.');
  });

  it('should show invalid email error message when an invalid email is entered', () => {
    const emailInput = component.loginForm.get('email');
    emailInput.setValue('invalid-email');
    emailInput.markAsTouched();
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.text-danger');
    expect(errorMessage.textContent).toContain('Please enter a valid email.');
  });

  it('should show required error message for password field when form is submitted with empty password', () => {
    const passwordInput = component.loginForm.get('password');
    passwordInput.setValue('');
    passwordInput.markAsTouched();
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.text-danger');
    expect(errorMessage.textContent).toContain('Password is required.');
  });

  it('should call the UserService to check login credentials when form is submitted with valid data', () => {
    const email = 'test@example.com';
    const password = 'testpassword';

    // Set up the form with valid data
    component.loginForm.setValue({
      email,
      password,
    });

    // Mock the UserService's response
    const mockUser = { email, password };
    userService.getUserByEmail.and.returnValue(of(mockUser));

    // Trigger form submission
    component.onLogin();

    // Expect the UserService's getUserByEmail function to have been called with the correct email
    expect(userService.getUserByEmail).toHaveBeenCalledWith(email);

    // Expect that the router.navigate function would have been called with the correct arguments
    expect(router.navigate).toHaveBeenCalledWith(['/home'], {
      queryParams: mockUser,
    });
  });

  it('should handle login failure when incorrect credentials are entered', () => {
    const email = 'test@example.com';
    const password = 'incorrectpassword';

    // Set up the form with valid data
    component.loginForm.setValue({
      email,
      password,
    });

    // Mock the UserService's response with null to simulate incorrect credentials
    userService.getUserByEmail.and.returnValue(of(null));

    // Spy on the console to check if the error message is logged
    spyOn(console, 'log');

    // Trigger form submission
    component.onLogin();

    // Expect the UserService's getUserByEmail function to have been called with the correct email
    expect(userService.getUserByEmail).toHaveBeenCalledWith(email);

    // Expect that the router.navigate function would NOT have been called
    expect(router.navigate).not.toHaveBeenCalled();

    // Expect that the console.log function would have been called with the error message
    expect(console.log).toHaveBeenCalledWith('Invalid email or password.');
  });
});
