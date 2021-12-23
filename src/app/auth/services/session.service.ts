import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  tap, map, catchError } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { login } from 'src/app/Interfaces/login.interface';
import { Register } from 'src/app/Interfaces/register.interface';

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
   login(body:login):Observable<boolean>{
    const url: string = `${environment.URL}/login`;

    /**
     * [headers request definition]
     *
     * @return  {HttpHeaders}
     */
    const headers:HttpHeaders = new HttpHeaders()
      .set('Content-Type','application/json');


    return this.http.post<any>(url,body,{headers})
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


  /**
   * [register]
   * 
   * @param   {Register}  body  [body request]
   *
   * @return  {Observable<any>}     [return description]
   */
  register(body:Register):Observable<any>{
    const url:string = `${environment.URL}/registrar`;

    return this.http.post(url,body);
  }
}
