import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthServices } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  private role: string = null;

  constructor(private auth: AuthServices, private router: Router){
    this.auth.getCurrentUser().subscribe(
      (user)=>{
        this.role = user ? user.role : null
      },
      (err)=>this.role = null
    )
  }



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  {
      if(this.auth.isAuthenticated() && this.role == 'admin'){
        return of(true);
      }else {
        this.router.navigate(['/profile'], {
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