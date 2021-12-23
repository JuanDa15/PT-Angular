import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsListService {

  constructor(private http:HttpClient) { }

  getList(){
    const url:string = `${environment.URL}/product`;

    const headers = new HttpHeaders()
          .set('Authorization',`Bearer 617cf7a097d2435d8250b948954817b7`)
          .set('Content-Type','application/json');
    

    return this.http.get(url,{headers}).pipe(
      map( (val:any) => val.results)
      );
  }
}
