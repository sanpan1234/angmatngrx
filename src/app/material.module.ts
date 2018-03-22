import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatOptionModule, MatSelectModule, MatRadioModule, MatToolbarModule
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
    MatToolbarModule
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
    MatToolbarModule
  ]
})
export class MaterialModule { }
