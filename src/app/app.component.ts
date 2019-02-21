import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { AuthServices } from './core/auth/auth.service';
import { MovieService } from './core/home/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  isLoadingPage: boolean;

  constructor(private router: Router, private auth: AuthServices, private movie: MovieService) {
    this.isLoadingPage = true;
  }

  ngOnInit(){
    if(localStorage.getItem('token')){
      this.auth.setToken(localStorage.getItem('token'));
      this.auth.iniCurrentUser();
    }

    this.movie.getFavoriteMovies()
      .subscribe(
        (res)=>{},
        (err)=>console.log(err)
      )
  }

  ngAfterViewInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.isLoadingPage = true;
        }
        else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          this.isLoadingPage = false;
        }
      });
  }

}
