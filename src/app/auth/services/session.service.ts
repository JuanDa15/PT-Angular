import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  tap, map, catchError } from 'rxjs/operators'
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http:HttpClient) { }

  /**
   * [login]
   * Validate the login information
   *
   * @param   {login}  body  [body description]
   *
   */
   login(body:any){
    const url: string = `${environment.URL}/login`;

    const headers = new HttpHeaders()
      .set('Content-Type','application/json');

    return this.http.post(url,body,{headers})
              .pipe(
                tap( (data:any) => {
                  if(data.ok){
                    sessionStorage.setItem('token',data.as_token!);
                  }
                }),
                map( data => data.ok),
                catchError( err => of(err.error.message))
              )
  }

  register(body:any){
    const url:string = `${environment.URL}/registrar`;

    return this.http.post(url,body);
  }
}
