import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Exercise } from './exercise';
import { TrainingService } from './training.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { UiService } from '../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercisesChangeSub: Subscription;
  isLoading = false;
  loadingSub: Subscription;
  exercises: Exercise[] = [];
  exercise: FormControl;
  selectedExercise: string;

  constructor(private trainingSvc: TrainingService, private db: AngularFirestore,
    private uiSvc: UiService) {
  }

  ngOnInit() {
    this.exercise = new FormControl('', [Validators.required]);
    this.loadingSub = this.uiSvc.loadingStateChange
      .subscribe(loading => this.isLoading = loading);
    this.trainingSvc.fetchAvailableExercises();
    this.exercisesChangeSub = this.trainingSvc.availableExercisesChange
      .subscribe(availableExercises => {
        this.exercises = availableExercises;
      })
  }

  startTraining() {
    if (!this.exercise.invalid) {
      this.selectedExercise = this.exercise.value;
      this.trainingSvc.startExercise(this.selectedExercise);
    }
  }

  ngOnDestroy(): void {
    if (this.exercisesChangeSub)
      this.exercisesChangeSub.unsubscribe();
    if (this.loadingSub)
      this.loadingSub.unsubscribe();
  }
}
