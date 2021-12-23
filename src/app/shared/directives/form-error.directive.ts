import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[FormError]'
})
export class FormErrorDirective implements OnInit{

  /**
   * [classList]
   *  Default error classlist
   * 
   * @var {string[]}
   */
  private classList:string[] = ['error','bg-l-red','bd-l-red','mt-error'];

  private htmlElement!:ElementRef<HTMLElement>;
 
 
  /**
    * [Receives the error by an attribute]
    */
  @Input() set errorMsg(msg:string){
    this.htmlElement.nativeElement.innerText = msg;
  }
   
  constructor(private element:ElementRef<HTMLElement>){
    this.htmlElement = element;
  }
 
  ngOnInit(): void {
    this.setClasses();
  }
 
  setClasses():void{
    this.classList.forEach( value => {
      this.htmlElement.nativeElement.classList.add(value);
    })
  }

}
