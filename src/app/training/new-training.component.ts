import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() onStartTraining = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  startTraining() {
    this.onStartTraining.emit();
  }
}
