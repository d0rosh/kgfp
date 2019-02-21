import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { CONFIG_URL } from '../../app.constants';
import { map, catchError } from 'rxjs/operators';
import { Message } from './movie.interfaces';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesId$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  getMovies(search: string, page: number): Observable<any>{
    if(!page){
      return this.http.get<any>(`${CONFIG_URL.OMDBAPI}s=${search}`)
    }else {
      return this.http.get<any>(`${CONFIG_URL.OMDBAPI}s=${search}&page=${page}`)
    }
  }

  getMoviesById(id: string): Observable<any>{
    return this.http.get<any>(`${CONFIG_URL.OMDBAPI}i=${id}`)
  }

  addToFavorite(movie: any): Observable<Message>{
    return this.http.post<Message>(`${CONFIG_URL.URL}/movie/add_movie`, movie)
  }

  getFavoriteMovies(): Observable<any> {
    return this.http.get<any>(`${CONFIG_URL.URL}/movie/get_movies`)
      .pipe(
        map(res=>{
          this.moviesId$.next(res.map(({imdbID})=>imdbID))
          return res;
        })
      )
  }

  getMoviesId(): Observable<string[]> {
    return this.moviesId$;
  }

  removeAllId(): void {
    this.moviesId$.next([]);
  }

  setId(id: string) {
    this.moviesId$.next(this.moviesId$.getValue().concat(id));
  }

  deleteMovie(id: string): Observable<Message>{
    return this.http.delete<Message>(`${CONFIG_URL.URL}/movie/delete_movie/${id}`)
      .pipe(
        map(res=>{
          if(res.message == 'Successsuccessfully deleted!') {
            this.moviesId$.next(this.moviesId$.value.filter((idm)=>idm !== id))
          }
          return res;
        })
      )
  }

  private _handleError(err: HttpErrorResponse) {
    return throwError(err.error.message);
  }
}
