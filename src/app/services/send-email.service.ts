import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Email } from '../Interfaces/email.interface';



@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  constructor(private http:HttpClient) { }

  sendEmail(body:Email){
    const url:string = `${environment.URL}/email`;

    return this.http.post(url,body);
  }
}
