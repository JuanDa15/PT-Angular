import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate, CanLoad {

  constructor(private router:Router){}

  
  canActivate(): Observable<boolean> | boolean {
    if(sessionStorage.getItem('token')){
      return true;
    }else{
      sessionStorage.clear();
      this.router.navigateByUrl('/auth/ingreso');
      Swal.fire({
        icon:'error',
        text:'Su sesion a expirado'
      });
      return false;
    }
  }
  canLoad(): Observable<boolean> | boolean {
    if(sessionStorage.getItem('token')?.trim().length !== 0){
      return true;
    }else{
      sessionStorage.clear();
      this.router.navigateByUrl('/auth/ingreso');
      Swal.fire({
        icon:'error',
        text:'Su sesion a expirado'
      });
      return false;
    }
  }
}
