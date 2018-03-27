import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Exercise } from './exercise';
import { TrainingService } from './training.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercisesChangeSub: Subscription;
  exercises: Exercise[] = [];
  exercise: FormControl;
  selectedExercise: string;

  constructor(private trainingSvc: TrainingService, private db: AngularFirestore) {
  }

  ngOnInit() {
    this.exercise = new FormControl('', [Validators.required]);
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
    this.exercisesChangeSub.unsubscribe();
  }
}
