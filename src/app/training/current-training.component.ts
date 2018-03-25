import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from './training.service';
import { Exercise } from './exercise';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer: number;
  private exercise: Exercise;

  constructor(private dialog: MatDialog, private trainingSvc: TrainingService) { }

  ngOnInit() {
    this.exercise = this.trainingSvc.getRunningExercise();
    if (this.exercise) {
      this.startOrResumeTimer();
    }
  }

  startOrResumeTimer() {
    const step = this.exercise.duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this.trainingSvc.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  stopTraining() {
    clearInterval(this.timer);
    const dlgRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dlgRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingSvc.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    })
  }
}
