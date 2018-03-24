import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatOptionModule, MatSelectModule, MatRadioModule, MatToolbarModule, MatSidenavModule, MatListModule, MatTabsModule, MatCardModule, MatProgressSpinnerModule, MatDialog, MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
