import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroListComponent } from './hero-list.component';
import { HeaderComponent } from '../navigation/header.component';
import { HeroService } from './hero.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeroDetailComponent,
    HeroListComponent,
    HeaderComponent,
  ],
  providers: [
    HeroService
  ]
})
export class HeroModule { }
