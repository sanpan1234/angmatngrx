import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { UiService } from '../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  loginForm: FormGroup;
  isLoading = false;
  loadingSub: Subscription;

  constructor(private fb: FormBuilder, private authSvc: AuthService,
    private uiSvc: UiService) {
    this.createForm();
   }

  ngOnInit() {
    this.loadingSub = this.uiSvc.loadingStateChange.subscribe(loading => {
      this.isLoading = loading;
    });
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

  ngOnDestroy(): void {
    if (this.loadingSub)
      this.loadingSub.unsubscribe();
  }
}
