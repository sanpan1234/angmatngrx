import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../_reducers/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  isLoading$: Observable<boolean>;
  
  constructor(private authSvc: AuthService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  onSubmit(form: NgForm) {
    this.authSvc.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
