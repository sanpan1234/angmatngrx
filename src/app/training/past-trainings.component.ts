import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { Exercise } from './exercise'
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  historyChangeSub: Subscription;

  @ViewChild(MatSort) sort;
  @ViewChild(MatPaginator) paginator;

  constructor(private trainingSvc: TrainingService) { }

  ngOnInit() {
    this.trainingSvc.getMyExercises();
    this.historyChangeSub = this.trainingSvc.exerciseHistoryChange
      .subscribe((myExercises: Exercise[]) => {
        this.dataSource.data = myExercises;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.historyChangeSub.unsubscribe();
  }
}
