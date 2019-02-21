import { Component, Input } from '@angular/core';
import { MovieService } from '../movie.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent {

  @Input() movies: Array<object> = []

  constructor(private movie: MovieService, private snackBar: MatSnackBar) { }

  addToList(movie: any) {
    if (movie.selected) {
      this.snackBar.open('This item is already in the list of favorites!', 'Close', {
        duration: 2000,
        panelClass: 'green-snackbar',
        verticalPosition: 'top'
      });
    } else {
      this.movie.addToFavorite(movie)
        .subscribe(
          (res) => {
            movie.selected = true;
            this.movie.setId(movie.imdbID);
            this.snackBar.open('You have successfully added a movie to your favorites!', 'Close', {
              duration: 2000,
              panelClass: 'green-snackbar',
              verticalPosition: 'top'
            });
          },
          (err) => {
            this.snackBar.open('You must log in before you can add movies to your favorites!', 'Close', {
              duration: 2000,
              panelClass: 'red-snackbar',
              verticalPosition: 'bottom'
            });
          }
        )
    }
  }
}
