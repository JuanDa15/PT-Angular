import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DepartmentsService } from 'src/app/services/departments.service';
import { AgeService } from 'src/app/shared/Validators/age.service';
import { PasswordService } from 'src/app/shared/Validators/password.service';
import Swal from 'sweetalert2';
import { SessionService } from '../../services/session.service';

interface Department {
  id:           number;
  departamento: string;
  ciudades:     string[];
}

enum helpMessages{
  phone = "Ejemplo: </br> 312 484 5958 </br> 325 2518",
  email = "El correo solo puede contener:<br> letras /números / + / - / _ / * / .",
  character = "Solo puede contener caracteres alfanúmericos",
  password = "La contraseña debe ser de 8 caracteres",
  age = 'Ej: 01/21/2022',
  id = 'El id debe tener una longitud entre 7 y 10 caracteress'
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  departamentos:Department[] = [];
  ciudades!: string[];

  messages = {
    phone     :  helpMessages.phone,
    email     :  helpMessages.email,
    character :  helpMessages.character,
    password  :  helpMessages.password,
    age       :  helpMessages.age,
    id        :   helpMessages.id
  }


  /**
     * [visible] = var to change the
     * icon and input type
     */
  visible:boolean = true;

  /**
    * [login form] = 
    * Reactive form structure
    *
    */
  registerForm:FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]{4,40}$/)
      ]
    ],
    id: [
      '',
      [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(10)
      ]
    ],
    email   : [
      '',
      [Validators.required,Validators.email]
    ],
    department:[
      '',
      Validators.required
    ],
    city:[
      '',
      Validators.required
    ],
    bornDate: [
      '',
      Validators.required
    ],
    genre:[
      '',
      Validators.required
    ],
    password: [
      '',
      [Validators.required,Validators.minLength(8)]
    ],
    password2: [
      '',
      [Validators.required,Validators.minLength(8)]
    ],
    dataTreatment: [
      '',
      [Validators.required,Validators.requiredTrue]
    ]
  },
  {
    validators: [
      this.ageValidator.ageValidator('bornDate'),
      this.passValidator.validatePasswords('password','password2')
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
              private spinner:NgxSpinnerService,
              private departments:DepartmentsService,
              private ageValidator:AgeService,
              private passValidator:PasswordService){}
  ngOnInit(): void {
    this.loadDepartments();
  }

  // UX Functions: 
  // manage the login form errors
  loginErrors(field:string){
    const errors = this.registerForm.get(field)?.errors;

    if(errors?.required){
      return 'El campo es requerido';
    }else if(errors?.email){
      return 'El formato de correo no es valido.';
    }else if(errors?.pattern){
      return 'El formato del campon no es valido.';
    }else if(errors?.minlength){
      let minLength = errors?.minlength?.requiredLength;
      let actualLength = errors?.minlength?.actualLength;

      return `La longitud debe ser mayor de: ${minLength} carácteres, longitud actual: ${actualLength}`
    }else if(errors?.maxlength){
      let maxlength = errors?.maxlength?.requiredLength;
      let actualLength = errors?.maxlength?.actualLength;

      return `La longitud debe ser menor o igual a: ${maxlength} carácteres, longitud actual: ${actualLength}`
    }else if(errors?.minlength){
      return 'La longitud debe ser de 8 caracteres minimo'
    }else if(errors?.underAge){
      return 'La persona no es mayor de edad.';
    }else if(errors?.notEqual){
      return 'Las contraseñas no son iguales';
    }else if(errors?.requiredTrue){
      return 'El campo debe ser verdadero';
    }else{
      return '';
    }
  }

  /**
     * [loadDepartments]
     * load the information on the departments select
     * 
     * @return  {void}
     */
   loadDepartments():void{
    this.departments.getinfo().subscribe({
      next: value => {
        this.departamentos = value;
        if(this.registerForm.get('department')?.value.trim().length === 0){
          this.registerForm.get('city')?.disable();
        }else{
          this.loadCities();
        }
      }
    })
  }

  /**
  * Form Error Manager
  */
   errorMessage(field:string):string{
    const errors = this.registerForm.get(field)?.errors;

    if(errors?.required){
      return 'Este campo es requerido';
    }else if(errors?.pattern){
      return 'El campo no cumple con el formato requerido.';
    }else if(errors?.maxlength){
      let maxlength = errors?.maxlength?.requiredLength;
      let actualLength = errors?.maxlength?.actualLength;

      return `La longitud debe ser menor o igual a: ${maxlength} carácteres, longitud actual: ${actualLength}`
    }else if(errors?.email){
      return 'El valor introducido no es un correo'
    }else{
      return '';
    }
  }


  /**
   * [loadCities]
   * load the information on the cities select.
   * 
   * @return  {void}
   */
  loadCities():void{
    if(this.registerForm.get('city')?.disabled){
      this.registerForm.get('city')?.enable();
    }
    let index = this.departamentos?.findIndex( departamento => this.registerForm.controls?.department?.value === departamento.departamento);
    this.ciudades = this.departamentos[ index ].ciudades;
  }



  /**
    * 
    * Check if a field is invalid or is touched
    * 
    * @param campo: ref to formControlName field
    * @returns {boolean | undefined}
    */
  invalidField( field: string): boolean | undefined{
    return  this.registerForm.get(field)?.invalid  &&
            this.registerForm.get(field)?.touched;
  }


  /**
    * sends the login information to the backend
    * and gets the token to validate the session
    *
    * @return  {void}
    */
   signUp():void{
    if(this.registerForm.valid){
      this.spinner.show();
      this.loginService.register(this.registerForm.value)
        .subscribe({
          next: (value:any) => {
              this.router.navigateByUrl('auth/ingresar')
              this.spinner.hide();
              Swal.fire({
                icon:'success',
                text:value.message
              })
            },
            error: (err) => { 
              Swal.fire({
                icon:'error',
                text:'Error al crear usuario'
              })
              this.spinner.hide();
              console.log(err);
            }
          })
      }
    }

}
