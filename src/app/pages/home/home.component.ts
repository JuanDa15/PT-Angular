import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  
  flag:Boolean = false;
  
  constructor() { }

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
