import { Component, Input, OnInit } from '@angular/core';
import { Property } from 'src/app/Interfaces/property.interface';

@Component({
  selector: 'property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent{
  @Input() property!:Property;
  constructor() { }
}
