import { Component } from '@angular/core';

@Component({
  selector: 'inicio',
  template: `
    <div id="inicio">
      <div class="content-container">
        <div class="slogan">
        <h1>Descubre</h1>
        <h2>Tu hogar perfecto!!</h2>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import '/src/styles.scss';

    #inicio{
    margin-top: -77px;
    position: relative;
    min-height: 75vh;
    background-image: url("/assets/img/cover.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    transition: all .3s ease;

    &::after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(27, 27, 27, 0.514);
    }

    &::before{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      z-index: 2;
      background-color: #fff;
      border-top-left-radius: 100%;
    }
    }

    .content-container{
    height: 75vh;
    display: grid;
    place-items: center left;
    }


    .slogan{
    position: relative;
    z-index: 2;
    color: $white;
    margin-left: 5%;
    width: 90%;
    transition: all .3s ease;

    h1{
      padding: .8rem;
      display: inline-block;
      background-color: $dark_blue;
      clip-path: polygon(0 23%, 95% 23%, 100% 79%, 3% 90%);
      font-size: 3rem;
    }

    h2{
      font-size: 2rem;
    }
    }


    @media screen and (min-width:800px) {
    #inicio{
      min-height: 100vh;
    }

    .slogan{

      h1{
      font-size: 4.5rem;
      }
    
      h2{
      font-size: 3.5rem;
      }
    }
    }
  `]
})
export class InicioComponent{
  constructor() { }
}
