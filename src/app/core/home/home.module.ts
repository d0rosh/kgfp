import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule, MatSnackBarModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, MoviesListComponent, MovieDetailsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    HomeRoutingModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,

  ]
})
export class HomeModule { }
