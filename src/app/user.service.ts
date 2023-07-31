import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: any[] = [];

  addUser(user: any): void {
    this.users.push(user);
  }

  getUserByEmail(email: string): any | undefined {
    return this.users.find((user) => user.email === email);
  }
}
