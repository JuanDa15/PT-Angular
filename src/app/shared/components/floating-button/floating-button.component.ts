import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'floating-button',
  templateUrl: './floating-button.component.html',
  styles: [`
    button{
      position:fixed;
      bottom: 50px;
      right: 50px;
      background-color: #12294b; 
      width:50px;
      height: 50px;
      border: 1px solid #4c82d3;
      border-radius: 50%;
      box-shadow: 3px 3px 1px #4c82d3;
    }

    i{
      font-size: 2rem;
      color: #fff;
    }

  `]
})
export class FloatingButtonComponent{

  @Input() flag!:Boolean;

  constructor() { }

  /**
   * [scroll]:
   *  scroll the page to the beginning
   * 
   * @return  {void}
   */
  scroll(): void{
    window.scrollTo(0,0);
  }

}
