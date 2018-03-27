import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { User } from './user';
import { AuthData } from './auth-data';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private fireAuthSvc: AngularFireAuth,
    private trainingSvc: TrainingService) { }

  initAuthListener() {
    this.fireAuthSvc.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.isAuthenticated = false;
        this.trainingSvc.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }
  registerUser(authData: AuthData) {
    this.fireAuthSvc.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      console.log(result);
    })
      .catch(error => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.fireAuthSvc.auth.signInWithEmailAndPassword(authData.email,
      authData.password).then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.fireAuthSvc.auth.signOut();
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }
}
