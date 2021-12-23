import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Email } from 'src/app/Interfaces/email.interface';
import { DepartmentsService } from 'src/app/services/departments.service';
import { SendEmailService } from 'src/app/services/send-email.service';
import Swal from 'sweetalert2';

interface listItem{
  icon: string;
  data: string;
}

interface Department {
  id:           number;
  departamento: string;
  ciudades:     string[];
}


enum helpMessages{
  phone = "Ejemplo: </br> 312 484 5958 </br> 325 2518",
  email = "El correo solo puede contener:<br> letras /números / + / - / _ / * / .",
  salary = "Ejemplos: </br> 3.000.000 </br> 3,000,000 <br> 3000000",
  risk = "Ejemplo: </br> 3,295%",
  character = "Solo puede contener caracteres alfanúmericos"
}

@Component({
  selector: 'servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {

  departamentos:Department[] = [];
  ciudades!: string[];

  listInfo:listItem[] = [
    {
      icon: 'envelope-open',
      data:'CorreoEmpresarial@correo.com'
    },
    {
      icon: 'phone',
      data: '+57 (X) 3619111'
    },
    {
      icon: 'phone',
      data: '2984185488'
    },
    {
      icon: 'building',
      data: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'
    }
  ]

  constructor(private fb:FormBuilder,
              private department:DepartmentsService,
              private sendEmail:SendEmailService) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  messages = {
    name      :  helpMessages.character,
    phone     :  helpMessages.phone,
    email     :  helpMessages.email,
    character :  helpMessages.character
  }

  contactForm:FormGroup = this.fb.group({
    name:[
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]{4,30}$/)
      ]
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(/3(\d{9}$|\d{6}$)/)
      ]
    ],
    department: [
      '',
      Validators.required
    ],
    city: [
      '',
      Validators.required
    ],
    subject: [
      '',
      [
        Validators.required,
        Validators.maxLength(40)
      ]
    ],
    message: [
      '',
      [
        Validators.required,
        Validators.maxLength(300)
      ]
    ]
  })

   /**
     * [loadDepartments]
     * load the information on the departments select
     * 
     * @return  {void}
     */
    loadDepartments():void{
      this.department.getinfo().subscribe({
        next: value => {
          this.departamentos = value;
          if(this.contactForm.get('department')?.value.trim().length === 0){
            this.contactForm.get('city')?.disable();
          }else{
            this.loadCities();
          }
        }
      })
    }
  
    /**
     * [loadCities]
     * load the information on the cities select.
     * 
     * @return  {void}
     */
    loadCities():void{
      if(this.contactForm.get('city')?.disabled){
        this.contactForm.get('city')?.enable();
      }
      let index = this.departamentos?.findIndex( departamento => this.contactForm.controls?.department?.value === departamento.departamento);
      this.ciudades = this.departamentos[ index ].ciudades;
    }

  /**
  * Form Error Manager
  */
  errorMessage(field:string):string{
    const errors = this.contactForm.get(field)?.errors;

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
   * [invalidField, ContractsInvalidField]
   * Function that decide if a field is valid or invalid,
   * used to show the errors messages
   *
   * @param   {field}   campo  [form field that call the function]
   *
   * @return  {boolean}         [return true or false depending field state]
   */
  invalidField( field: string): boolean | undefined{
    return  this.contactForm.get(field)?.invalid && 
            this.contactForm.get(field)?.touched;
  }

  sendForm(){
    if(this.contactForm.valid){
      const body:Email =  this.contactForm.value;

      this.sendEmail.sendEmail(body)
        .subscribe({
          next: (val:any) => Swal.fire({
            icon:'success',
            text:val.message
          }),
          error: (err) => Swal.fire({
            icon:'error',
            text: err
          })
        })
    }
  }
}
