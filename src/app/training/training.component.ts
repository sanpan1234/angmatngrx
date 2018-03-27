import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from './training.service';
import { Exercise } from './exercise';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  exerciseChangeSubscription: Subscription;
  ongoingTraining = false;

  constructor(private trainingSvc: TrainingService) { }

  ngOnInit() {
    this.exerciseChangeSubscription = this.trainingSvc.onExerciseChange.subscribe(isStart => {
      this.ongoingTraining = isStart;
    });
  }

  ngOnDestroy(): void {
    if (this.exerciseChangeSubscription)
      this.exerciseChangeSubscription.unsubscribe();
  }
}
