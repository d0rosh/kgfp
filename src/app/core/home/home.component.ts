import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, concatMap, mergeMap, tap } from 'rxjs/operators';
import { MovieService } from './movie.service';
import { of } from 'rxjs';
import { PageEvent, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  search = new FormControl('');
  movies: Array<object> = [];
  moviesLength: number = 0;
  pageEvent: PageEvent;
  moviesId: string[] = [];
  
  constructor(private movie: MovieService, private snackBar: MatSnackBar) { 
    this.movie.getMoviesId().subscribe(
      res=>{
        this.moviesId = res;
      },
      err=>console.log(err)
    )
  }

  changePage(event): void{
    this.pageEvent = event;
    this.pageEvent.pageIndex++
    this.movie.getMovies(this.search.value, this.pageEvent.pageIndex++)
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap((res)=>this.moviesLength = +res.totalResults),
      concatMap(res => {
        this.movies = [];
        if(res.Response == 'True'){
          return res.Search
        }
        return of(false)
      }),
      mergeMap((movie :any) => {
        if(movie.imdbID){
          return this.movie.getMoviesById(movie.imdbID)
        }
        return of(false)
      }), 
    )
    .subscribe(
      (movie: any)=> {
        if(movie) {
          movie.Genre = movie.Genre.split(',');
          movie.Poster = movie.Poster == 'N/A' ? 'assets/img/user.png' : movie.Poster;

          this.moviesId.forEach(id=>{
            if(movie.imdbID === id){
              movie['selected'] = true;
            }
          })
          
          movie.selected = movie.selected ? movie.selected : false;
          this.movies.push(movie);
        }
      },
      (err) => console.log('ERROR!:', err)
    )
  }
  

  ngOnInit() {    
    this.search
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(search =>{
          this.movies = [];
          
          if(this.pageEvent) {
            this.pageEvent.pageIndex = 0;
          }
          return this.movie.getMovies(search, null)}
        ),
        tap((res)=>this.moviesLength = +res.totalResults),
        concatMap(res => {
          if(res.Response == 'True'){
            return res.Search
          }
          return of(false)
        }),
        mergeMap((movie :any) => {
          if(movie.imdbID){
            return this.movie.getMoviesById(movie.imdbID)
          }
          return of(false)
        }),
      )
      .subscribe(
        (movie: any)=> {
          if(movie) {
            movie.Genre = movie.Genre.split(',');
            movie.Poster = movie.Poster == 'N/A' ? 'assets/img/user.png' : movie.Poster;

            this.moviesId.forEach(id=>{
              if(movie.imdbID === id){
                movie['selected'] = true;
              }
            })
            
            movie.selected = movie.selected ? movie.selected : false;
            this.movies.push(movie);
          }else {
            if(this.search.value !== ''){
              this.snackBar.open('Movies not found!', 'Close', {
                duration: 2000,
                panelClass: 'red-snackbar',
                verticalPosition: 'bottom'
              });
            }
          }

        },
        (err) => console.log('ERROR!:', err)
      )
  }
  

}
