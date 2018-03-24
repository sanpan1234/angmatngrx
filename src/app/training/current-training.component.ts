import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer: number;
  @Output() onStopTraining = new EventEmitter<void>();
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  stopTraining() {
    clearInterval(this.timer);
    const dlgRef = this.dialog.open(StopTrainingComponent, {
      data: {
      progress: this.progress
      }
    });
    dlgRef.afterClosed().subscribe(result =>
    {
      if (result) {
        this.onStopTraining.emit();
      } else {
        this.startOrResumeTimer();
      }
    })
  }
}
