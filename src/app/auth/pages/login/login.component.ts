import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  /**
   * [visible] = var to change the
   * icon and input type
   */
   visible:boolean = true;
   /**
    * Get the password input to 
    * dynamically change the input
    * type
    */
   @ViewChild('passwordInput') passwordInput!:ElementRef;
 
   /**
    * [login form] = 
    * Reactive form structure
    *
    */
   loginForm:FormGroup = this.fb.group({
     email   : [
       '',
       [Validators.required,Validators.email]
     ],
     password: [
       '',
       [Validators.required,Validators.minLength(8)]
     ]
   })
 
   /**
    * 
    * @param fb
    * @description = angular form builder 
    * @param validations 
    * @description = synchronous validations service
    * @param emailValidator 
    * @description = asynchronous email validator
    * @param loginService
    * @description = validates the login information 
    * @router
    * @description = Angular router module
    * @spinner 
    * @description = loading spinner service
    * @notifications
    * @description = swall notifications manager
    */
   constructor(private fb:FormBuilder,
               private loginService: SessionService,
               private router:Router,
               private spinner:NgxSpinnerService){}
 
   // UX Functions: 
   // manage the login form errors
   loginErrors(field:string){
     const errors = this.loginForm.get(field)?.errors;
 
     if(errors?.required){
       return 'El campo es requerido';
     }else if(errors?.email){
       return 'El formato de correo no es valido.';
     }else if(errors?.minlength){
       return 'La longitud debe ser de 8 caracteres minimo'
     }else{
       return '';
     }
   }
   // --------------------------------------------
   /**
    * [hidePassword] = Function that toggles
    * the password button icon and changes the 
    * password input type betwen 'password' and 'text'
    *
    * @return  {void}
    */
   hidePassword():void{
     this.visible = !this.visible;
     this.passwordInput.nativeElement.type = this.visible? 'password' : 'text';
   }
 
   // Functional functions:
 
 
   /**
    * 
    * Check if a field is invalid or is touched
    * 
    * @param campo: ref to formControlName field
    * @returns {boolean | undefined}
    */
   invalidField( field: string): boolean | undefined{
     return  this.loginForm.get(field)?.invalid  &&
             this.loginForm.get(field)?.touched;
   }
 
 
   /**
    * sends the login information to the backend
    * and gets the token to validate the session
    *
    * @return  {void}
    */
   logIn():void{
     if(this.loginForm.valid){
       this.loginService.login(this.loginForm.value)
         .subscribe({
           next: (value:any) => {
             if(value === true){
               this.router.navigateByUrl('/products')
               Swal.fire({
                 icon:'success',
                 text:'session iniciada correctamente'
               })
             }else{
               Swal.fire({
                 icon:'error',
                 text:'Error al iniciar sesion'
               })
             }
           }
         })
       }
     }

}
