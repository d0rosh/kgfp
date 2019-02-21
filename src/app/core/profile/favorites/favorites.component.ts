import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../home/movie.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  movies: any[] = [];
  constructor(private movie: MovieService, private snackBar: MatSnackBar) { }

  deleteMovie(movie: any){
    this.movie.deleteMovie(movie.imdbID)
      .subscribe(
        (res)=>{
          this.movies = this.movies.filter(({imdbID}) => imdbID !== movie.imdbID);
          this.snackBar.open('Successfully deleted!', 'Close', {
            duration: 2000,
            panelClass: 'green-snackbar',
            verticalPosition: 'top'
          })
        },
        (err)=>console.log(err)
      )
  }

  ngOnInit() {
    this.movie.getFavoriteMovies()
      .subscribe(
        (res)=>{
          this.movies = res;
        },
        (err)=>console.log(err)
      )
  }

}
