import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const user = this.userService.getUserByEmail(email);
      if (user && user.password === password) {
        // Redirect to the home page with the logged-in user details as query parameter
        this.router.navigate(['/home'], { queryParams: user });
      } else {
        // Handle incorrect credentials, display an error message, or redirect to a login failed page
        console.log('Invalid email or password.');
      }
    }
  }
}
