import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UiService {

  loadingStateChange = new Subject<boolean>();
  constructor(private snackbar: MatSnackBar) { }

  showSnackbar(message, action = null, duration = 3000) {
    this.snackbar.open(message, action, {
      duration: duration
    });
  }

}
