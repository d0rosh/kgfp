import { Component, OnInit } from '@angular/core';
import { concat } from 'rxjs';
import { AuthServices } from '../core/auth/auth.service';
import { Router } from '@angular/router';
import { CurrentUser } from '../core/auth/auth.interfaces';
import { MovieService } from '../core/home/movie.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser$: CurrentUser;
  countMovies: number = 0;
 
  visibleBtn(): boolean {
    return this.auth.isAuthenticated();
  }

  logout(): void{
    this.auth.logout();
    this.movie.removeAllId();
    this.router.navigate(['/auth/login']);
  }

  constructor(private auth: AuthServices, private router: Router, private movie: MovieService) { }


  ngOnInit() {
    this.auth.getCurrentUser().subscribe(
      (user)=>{
        this.currentUser$ = user;
      },
      (err)=>console.log(err)
    )

    this.movie.getMoviesId().subscribe(
      res=>{
        this.countMovies = res.length;
      },
      err=>console.log(err)
    )
    
  }


}
