import { Component} from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  navCong:string[] = [
    'inicio',
    'conocenos',
    'contactanos'
  ]

  constructor(private router:Router) { }


  /**
   * [toggle description]
   * Function used to togle the navbar in mobile view
   *
   * @return  {void}
   */
  toggle():void{
    let btn:HTMLButtonElement = document.querySelector('.btn')!;
    let links:HTMLUListElement = document.querySelector('.nav-links')!;

    links.classList.toggle('nav-active');
    btn.classList.toggle('btn-transition');
    btn.classList.toggle('btn-colors')
    
    setTimeout(()=>{
      btn.classList.toggle('btn-transition');
    },500)
  }

  redirection(){
    (sessionStorage.getItem('token'))?
        this.router.navigateByUrl('/products'):
        this.router.navigateByUrl('/auth/ingreso')
  }

}
