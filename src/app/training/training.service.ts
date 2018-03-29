import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { UiService } from '../shared/ui.service';

@Injectable()
export class TrainingService {

  private availableExercises: Exercise[] = [];
  availableExercisesChange = new Subject<Exercise[]>();
  private myExerciseHistory: Exercise[] = [];
  exerciseHistoryChange = new Subject<Exercise[]>();
  private runningExercise: Exercise
  onExerciseChange = new Subject<boolean>();
  private dbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiSvc: UiService) { }

  fetchAvailableExercises() {
    this.uiSvc.loadingStateChange.next(true);
    this.dbSubs.push(this.db.collection('availableExercises').snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          const dataObj = doc.payload.doc.data();
          return {
            id: doc.payload.doc.id,
            name: dataObj.name,
            duration: dataObj.duration,
            calories: dataObj.calories
          }
        })
      })
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.availableExercisesChange.next(this.availableExercises);
        this.uiSvc.loadingStateChange.next(false);
      }, (error) => {
        this.uiSvc.loadingStateChange.next(false);
        this.uiSvc.showSnackbar(error);
      }));
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    if (this.runningExercise) {
      this.onExerciseChange.next(true);
    }
  }

  completeExercise() {
    this.saveExercise({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.onExerciseChange.next(false);
  }

  cancelExercise(progress: number) {
    this.saveExercise({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.onExerciseChange.next(false);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getMyExercises() {
    this.dbSubs.push(this.db.collection('finishedExercises').valueChanges()
      .subscribe((myExercises: Exercise[]) => {
        this.myExerciseHistory = myExercises;
        this.exerciseHistoryChange.next(this.myExerciseHistory);
      }));
  }

  saveExercise(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }

  cancelSubscriptions() {
    if (this.dbSubs)
      this.dbSubs.forEach(sub => sub.unsubscribe());
  }
}
