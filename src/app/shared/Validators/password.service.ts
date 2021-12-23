import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor() { }

  /**
 * [validatePasswords]
 * Validator to define if two passwords are equal.
 * If not returns an error to the form
 *
 * @param   {any}  password1  [password1 form control first password]
 * @param   {any}  password2  [password2 form control second password]
 *
 */
   validatePasswords(password1:any, password2:any){
    return (control:AbstractControl) => {
      
      const pass1 = control.get(password1)?.value;
      const pass2 = control.get(password2)?.value;

      if(pass1 === pass2){
        control.get(password2)?.setErrors(null);
        return null;
      }else{
        let error = {notEqual: true};
        control.get(password2)?.setErrors(error);
        return error;
      }
    }
  }
}
