import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { User } from './user';
import { AuthData } from './auth-data';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private fireAuthSvc: AngularFireAuth,
    private trainingSvc: TrainingService, private uiSvc: UiService) { }

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
    this.uiSvc.loadingStateChange.next(true);
    this.fireAuthSvc.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      this.uiSvc.loadingStateChange.next(false);
      console.log(result);
    })
      .catch(error => {
        this.uiSvc.loadingStateChange.next(false);
        this.uiSvc.showSnackbar(error.message);
      });
  }

  login(authData: AuthData) {
    this.uiSvc.loadingStateChange.next(true);
    this.fireAuthSvc.auth.signInWithEmailAndPassword(authData.email,
      authData.password).then(result => {
        console.log(result);
        this.uiSvc.loadingStateChange.next(false);
      })
      .catch(error => {
        this.uiSvc.loadingStateChange.next(false);
        this.uiSvc.showSnackbar(error.message);
      });
  }

  logout() {
    this.fireAuthSvc.auth.signOut();
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }
}
