import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Department {
  id: number;
  departamento: string;
  ciudades: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  /**
   * [endPoint]:
   * url request direction
   */
  endPoind: string = "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json";

  constructor(private http: HttpClient) { }

  /**
   * [getinfo]
   *
   * @return  {Observable<Departamentos>[]}[Colombia Departments and cities arr]
   */
  getinfo(): Observable<Department[]> {
    return this.http.get<Department[]>(this.endPoind);
  }
}
