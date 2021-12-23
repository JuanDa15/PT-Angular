import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <navbar (window:scroll)="displayButton( $event )"></navbar>
    <inicio></inicio>
    <conocenos></conocenos>
    <servicios></servicios>
    <footer-component></footer-component>
    <floating-button [flag]="flag"></floating-button>

  `,
  styles: [``]
})
export class HomeComponent{

  /**
   * [Var used to communicate to the child component the current position of the screen]
   * if true, the navigation btn is displayed
   */
  flag:Boolean;
  
  constructor(){
    this.flag = false;
  }

    /**
   * [displayButton]
   * Hide and show the initial scroll button
   *
   * @param   {any}  event  [window event]
   *
   * @return  {void}
   */
    displayButton(event:any):void{
      let yPos:number = event.target.scrollingElement.scrollTop;
      (yPos <= 500)? this.flag = false:this.flag = true;
    }

}
