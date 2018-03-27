import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training.component';
import { NewTrainingComponent } from './new-training.component';
import { PastTrainingsComponent } from './past-trainings.component';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from './training.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  entryComponents: [
    StopTrainingComponent
  ],
  providers: [
    TrainingService
  ]
})
export class TrainingModule { }
