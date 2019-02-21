import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG_URL } from '../../app.constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  // login(user: User): Observable<{token: string, user: any}> {
  //   return this.http.post<{token: string, user: any}>(`${CONFIG_URL.URL}/auth/login`, user)
  //     .pipe(
  //       tap(({token,user})=>{
  //         localStorage.setItem('token',token);
  //         this.setToken(token);
  //         this.setCurrentUser(user);
  //       }),
  //       catchError(this._handleError)
  //     )
  // }

  getUsers(): Observable<any>{
    return this.http.get<any>(`${CONFIG_URL.URL}/profile/get_users`)
      .pipe(
        map(res=>res)
      )
  }

}
