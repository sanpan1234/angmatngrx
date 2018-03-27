import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { UiService } from '../shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading = false;
  private loadingSub: Subscription;

  constructor(private authSvc: AuthService, private uiSvc: UiService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loadingSub = this.uiSvc.loadingStateChange.subscribe(loading => {
      this.isLoading = loading;
    });
  }

  onSubmit(form: NgForm) {
    this.authSvc.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy(): void {
    if (this.loadingSub)
      this.loadingSub.unsubscribe();
  }
}
