import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AgeService {

  constructor() { }

  ageValidator(date:any){
    return (control:AbstractControl) => {

      let today = new Date();
      let bornDate = new Date(control.get(date)?.value);


      let years = today.getFullYear() - bornDate.getFullYear();
      let months = today.getMonth() - bornDate.getMonth();

      if(months < 0 || (months === 0 && today.getDate() < bornDate.getDate())){
        years--;
      }

      if(years >= 18){
        control.get(date)?.setErrors(null);
        return null;
      }else{
        let error = {underAge: true};
        control.get(date)?.setErrors(error);
        return error;
      }
      
    }
  }
}
