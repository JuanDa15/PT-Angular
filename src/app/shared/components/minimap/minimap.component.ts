import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'minimap',
  template: `
    <div  class="minimap"
          #map>
    </div>
  `,
  styles: [`
    .minimap{
      width: 100%;
      height: 200px;
    }
  `]
})
export class MinimapComponent  implements OnInit,AfterViewInit  {

  @ViewChild('map') mapDiv!:ElementRef;
  map!:mapboxgl.Map;
  
  @Input() center!: [number,number];

  constructor(){}

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.mapDiv.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      //         lng      lat
      center: this.center,
      zoom: 16,
      interactive: false
    })

    new mapboxgl.Marker({}).setLngLat(this.center).addTo(this.map);
  }

  ngOnInit(): void {
  }

}
