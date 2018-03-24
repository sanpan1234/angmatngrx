import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup.component';
import { LoginComponent } from './auth/login.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training.component';
import { NewTrainingComponent } from './training/new-training.component';
import { PastTrainingsComponent } from './training/past-trainings.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeroDetailComponent } from './hero/hero-detail.component';
import { HeroListComponent } from './hero/hero-list.component';
import { HeroService } from './hero/hero.service';
import { HeaderComponent } from './navigation/header.component';
import { SidenavListComponent } from './navigation/sidenav-list.component';
import { StopTrainingComponent } from './training/stop-training.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    WelcomeComponent,
    HeroDetailComponent,
    HeroListComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [HeroService],
  bootstrap: [AppComponent],
  entryComponents: [
    StopTrainingComponent
  ]
})
export class AppModule { }
