import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training.component';
import { NewTrainingComponent } from './new-training.component';
import { PastTrainingsComponent } from './past-trainings.component';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
  imports: [
    SharedModule,
    TrainingRoutingModule
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
  ]
})
export class TrainingModule { }
