import { Directive, ElementRef, Input, OnInit } from '@angular/core';

/**
 * TOOLTIP DIRECTIVE
 * 
 * DIRECTIVE USED TO DISPLAY A SMALL TOOLTIP IN THE INPUTS TO GUIDE THE
 * USER
 */

@Directive({
  selector: '[InputHelper]'
})
export class InputHelperDirective implements OnInit{

  private htmlElement!: ElementRef<HTMLElement>;
  private div = document.createElement('div');

  @Input() message:string = '';

  constructor(private element:ElementRef<HTMLElement>){
    this.htmlElement = element;
    this.createElement();
  }
  ngOnInit(): void {
    this.div.children[0].innerHTML = this.message;
  }

  createElement():void{
    this.div.innerHTML = `
      <span class="tooltip__text"></span>
      <i class="fas fa-question-circle">${this.message}</i>
      `;
    this.div.classList.add('helper')
    this.htmlElement.nativeElement.append(this.div);
  }

}
