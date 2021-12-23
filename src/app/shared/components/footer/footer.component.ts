import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer-component',
  template: `
    <section id="footer">
      <div  class="content-container">
        <ul class="links__container">
          <li class="links"
              routerLink="/inicio"
              fragment="inicio">Inicio</li>
          <li class="links">Terminos y condiciones</li>
          <li class="links">Politicas de privacidad</li>
          <li class="links"
              routerLink="/inicio"
              fragment="conocenos">Sobre nosotros</li>
        </ul>

        <span class="copy">nombre empresa &copy; 20XX</span>
      </div>
    </section>
  `,
  styles: [`
    @import '/src/styles';

    *{
      font-family: 'Montserrat', 'roboto', sans-serif;
    }

    #footer{
      background-color: $dark_blue;
    }

    .links__container{
      display: flex;
      flex-flow: column nowrap;
      width: 100%;
      align-items: center;
      list-style: none;
      color: #fff;
      font-size: 1.1rem;
      padding-top: 3rem;
    }

    .links{
      margin-bottom: 1.5rem;
      width: 300px;
      text-align: center;

      &:hover{
        color: $light_blue;
        font-weight: 700;
        cursor: pointer;
      }
    }


    .copy{
      display:inline-block;
      width: 100%;
      text-align: center;
      color: #fff;
      margin: 4rem auto; 
    }

    @media screen and (min-width: 800px){
      .links__container{
        width: 100%;
        justify-content: space-around;
        list-style: none;
        flex-flow: row nowrap;
        color: #fff;
        padding-top: 3rem;
      }
      
    }
  `]
})
export class FooterComponent{
  constructor() { }
}
