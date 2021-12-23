import { Component, Input } from '@angular/core';

/**
 * floating-button COMPONENT
 * 
 * this component is used to returns the user at the 
 * beginning of the page when is scrollable
 * 
 *
 * 
 * HOW TO USE IT: 
 * 
 * this component has one input, and doesn't have  outputs
 * 
 * flag: 
 * Boolean value that says if the user is out of the initial viewport
 * 
 */

@Component({
  selector: 'floating-button',
  template: `
  <button class="btn c-white"
          *ngIf="flag"
          (click)="scroll()"
          routerLink="/inicio">
        <i class="fas fa-chevron-up"></i>
  </button>
  `,
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
