import { Component, Input, OnInit } from '@angular/core';
import { Property } from 'src/app/Interfaces/property.interface';

@Component({
  selector: 'property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent{

  /**
   * Receives all the property information that is displayed on the card
   */
  @Input() property!:Property;
  constructor() { }
}
