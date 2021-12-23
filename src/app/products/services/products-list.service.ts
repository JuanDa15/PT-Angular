import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Property } from 'src/app/Interfaces/property.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsListService {

  constructor(private http:HttpClient) { }

  getList():Observable<Property[]>{
    const url:string = `${environment.URL}/product`;

    const headers:HttpHeaders = new HttpHeaders()
          .set('Authorization',`Bearer 617cf7a097d2435d8250b948954817b7`)
          .set('Content-Type','application/json');
    

    return this.http.get<any>(url,{headers}).pipe(
      map( (val:any) => val.results)
      );
  }
}
