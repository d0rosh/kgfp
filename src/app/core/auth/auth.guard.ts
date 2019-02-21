import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthServices } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthServices, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      if(next.data.isAuth){
        const current_route =  this.router.routerState.snapshot['url'];
        if(next.data.isAuth && this.auth.isAuthenticated() && localStorage.getItem('token')){
          this.router.navigate([current_route]);
          return of(false);
        }else {
          this.auth.setToken(null);
          this.auth.setCurrentUser(null);
          return of(true);
        }
      }else if(this.auth.isAuthenticated() && localStorage.getItem('token')){
        return of(true);
      }else {
        this.auth.setToken(null);
        this.auth.setCurrentUser(null);
        this.router.navigate(['auth/login'], {
          queryParams: {
            accessDenied: true
          }
        });
        return of(false);
      }
  }

  canActivateChild(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
      return this.canActivate(next, state);
  }
}
