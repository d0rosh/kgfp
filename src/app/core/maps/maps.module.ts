import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { MapsRoutingModule } from './maps-routing.module';
import { MapFirstComponent } from './map-first/map-first.component';
import { MapSecondComponent } from './map-second/map-second.component';

@NgModule({
  declarations: [MapFirstComponent, MapSecondComponent],
  imports: [
    CommonModule,
    MapsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'api_key',
      libraries: ['places']
    }),
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSnackBarModule
    
  ]
})
export class MapsModule { }
