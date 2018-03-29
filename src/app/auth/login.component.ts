import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
//import { UiService } from '../shared/ui.service';
import { Subscription, Observable } from 'rxjs';
import 'rxjs/operator/map';
import * as fromRoot from '../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  loadingSub: Subscription;

  constructor(private fb: FormBuilder, private authSvc: AuthService,
    private store: Store<fromRoot.State>) {
    this.createForm();
  }

  ngOnInit() {
    /* this.loadingSub = this.uiSvc.loadingStateChange.subscribe(loading => {
      this.isLoading = loading;
    }); */
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.authSvc.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
