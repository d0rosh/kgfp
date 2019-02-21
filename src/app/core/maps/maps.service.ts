import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  private readonly url = 'https://postcodes.io';

  constructor(private http: HttpClient) { }

  getPostCodesAutocomplete(search: string): Observable<any> {
    if(search != ''){
      return this.http.get<any>(`${this.url}/postcodes/${search}/autocomplete`)
      .pipe(
        switchMap(data => {
          if (Array.isArray(data['result']) && data['result'].length > 1) {
            return data['result'];
          }else if(data['result'] == null){
            return of(false)
          }
           else {
            return  this.getPostCodeInfo(data.result[0])
          }
        })
      )
    }else {
      return of(false)
    }
    
  }

  getPostCodeInfo(code: string): Observable<any>{
    return this.http.get<any>(`${this.url}/postcodes/${code}`)
    .pipe(
      map(res=>{
        return res.result;
      })
    )
  }

  private _handleError(err: HttpErrorResponse) {
    console.log(err);
    return throwError(err.message);
  }
}

