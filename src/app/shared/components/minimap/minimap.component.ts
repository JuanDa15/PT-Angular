import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

/**
 * MINIMAP COMPONENT
 * 
 * this component is used to show a small preview of a property location
 * 
 * HOW TO USE IT: 
 * 
 * this component has one input
 * 
 * center: [number,number] | [lnt=longitud,lat=latitud]
 * 
 * Receives the point when the property is located
 * 
 */

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
export class MinimapComponent  implements AfterViewInit  {

  /**
   * Div that shows the map
   */
  @ViewChild('map') mapDiv!:ElementRef;
  map!:mapboxgl.Map;
  
  @Input() center!: [number,number];

  constructor(){}

  ngAfterViewInit(): void {
    /**
     * [Initialize the map before the init to avoid some error]
     *
     * @return  {[type]}  [return description]
     */
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


}
