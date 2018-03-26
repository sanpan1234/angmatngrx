import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise';

@Injectable()
export class TrainingService {
  
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private myExerciseHistory: Exercise[] = [];
  private runningExercise: Exercise
  onExerciseChange = new Subject<boolean>();

  constructor() { }

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId); 
    if (this.runningExercise) {
      this.onExerciseChange.next(true);
    }
  }

  completeExercise() {
    this.myExerciseHistory.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.onExerciseChange.next(false);
  }

  cancelExercise(progress: number) {
    this.myExerciseHistory.push({
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
    return this.myExerciseHistory.slice();
  }
}
