import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { SignupComponent } from './signup.component';
import { LoginComponent } from './login.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AngularFireAuthModule,
    AuthRoutingModule
  ],
  declarations: [
    SignupComponent,
    LoginComponent
  ]
})
export class AuthModule { }
