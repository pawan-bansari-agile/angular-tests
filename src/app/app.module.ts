import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Add this line
import { AppRoutingModule } from './app-routing.module'; // Add this line
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, SignupComponent, LoginComponent, HomeComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // Add this line
    AppRoutingModule, // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
