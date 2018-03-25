import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  constructor(private trainingSvc: TrainingService) {   
  }

  ngOnInit() {
    this.exercises = this.trainingSvc.getAvailableExercises();
  }

  startTraining() {
    this.onStartTraining.emit();
  }
}
