import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { User } from './user';
import { AuthData } from './auth-data';

@Injectable()
export class AuthService {
  private user: User;
  authChange = new Subject<boolean>();
  
  constructor(private router: Router) { }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
    this.router.navigate(['/training']); 
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth(): boolean{
    return this.user != null;
  }
}