import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movies: any = null;
  moviesId: string[] = [];
  constructor(private route: ActivatedRoute, private movie: MovieService, private snackBar: MatSnackBar) {
  this.movie.getMoviesId().subscribe(
      res=>{
        this.moviesId = res;
      },
      err=>console.log(err)
    )
  }

  ngOnInit() {
    this.movie.getMoviesById(this.route.snapshot.params.id).subscribe(
      movie => {
        movie.Genre = movie.Genre.split(',');
        movie.Poster = movie.Poster == 'N/A' ? 'assets/img/user.png' : movie.Poster;

        this.moviesId.forEach(id=>{
          if(movie.imdbID === id){
            movie['selected'] = true;
          }
        })
        
        movie.selected = movie.selected ? movie.selected : false;
        this.movies = movie;
      },
      err => console.log(err)
    )
  }

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
