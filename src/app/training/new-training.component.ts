import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Exercise } from './exercise';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() onStartTraining = new EventEmitter<void>();
  exercises: Exercise[] = [];
  exercise: FormControl;
  selectedExercise: string;

  constructor(private trainingSvc: TrainingService) {   
  }

  ngOnInit() {
    this.exercise = new FormControl('', [Validators.required]);
    this.exercises = this.trainingSvc.getAvailableExercises();
  }

  startTraining() {
    if (!this.exercise.invalid) {
      this.selectedExercise = this.exercise.value;
      this.trainingSvc.startExercise(this.selectedExercise);
    }  
  }
}
