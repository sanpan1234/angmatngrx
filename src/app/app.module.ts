import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header.component';
import { SidenavListComponent } from './navigation/sidenav-list.component';

import { environment } from '../environments/environment';
import { UiService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';
import { MaterialModule } from './material.module';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { reducers } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [UiService, AuthService, TrainingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
