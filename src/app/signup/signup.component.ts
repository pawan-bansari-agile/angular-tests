import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, this.phoneNumberValidator()]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator() },
    );
  }

  onSignup(): void {
    this.isSubmitted = true;

    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.userService.addUser(formData);
      console.log('Signup successful! User details:', formData);
      this.router.navigate(['/home'], { queryParams: formData });

      this.signupForm.reset();
      this.isSubmitted = false;
    }
  }

  phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const validPhoneNumber = /^\d{10}$/; // Regular expression for 10 digits
      const isValid = validPhoneNumber.test(control.value);
      return isValid ? null : { invalidPhoneNumber: true };
    };
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: FormGroup): { [key: string]: any } | null => {
      const password = control.get('password').value;
      const confirmPassword = control.get('confirmPassword').value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }
}
