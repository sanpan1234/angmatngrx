import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Exercise } from './exercise';
import { TrainingService } from './training.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../_reducers/app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercisesChangeSub: Subscription;
  isLoading$: Observable<boolean>;
  exercises: Exercise[] = [];
  exercise: FormControl;
  selectedExercise: string;

  constructor(private trainingSvc: TrainingService, private db: AngularFirestore, private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.exercise = new FormControl('', [Validators.required]);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
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
  }
}
