import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServices } from '../auth/auth.service';
import { MovieService } from '../home/movie.service';
import { CurrentUser } from '../auth/auth.interfaces';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser$: CurrentUser;
  sub: Subscription;
  id: any = null;
  constructor(
    private auth: AuthServices,
    private movie: MovieService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.auth.getCurrentUser()
      .subscribe(
        (res) => {
          this.currentUser$ = res;
        },
        (err) => console.log(err)
      )
    this.movie.getFavoriteMovies()
      .subscribe(
        (res) => { },
        (err) => console.log(err)
      )

      this.sub = this.route.queryParams.subscribe((params: Params)=>{
        if(params['accessDenied']){
          this.id = setTimeout(() => {
            this.snackBar.open('Access Denied!', 'Close', {
              duration: 2000,
              panelClass: 'red-snackbar'
            })
          })
        }
        
      });
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
    clearTimeout(this.id);
  }

}
