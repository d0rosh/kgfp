import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSpinner } from '@angular/material';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [MatSpinner, LoaderComponent],
  imports: [
    CommonModule,
  ],
  exports: [LoaderComponent]
})
export class SharedModule { }
