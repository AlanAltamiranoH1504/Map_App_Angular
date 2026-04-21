import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment.development';
import { DecimalPipe, JsonPipe } from '@angular/common';
// import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = environment.TOKEN_MAPS;

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscreen-map-page.html',
  styles: `
    div {
      width: 100vw;
      height: calc(100vh - 64px);
    }
    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      width: 250px;
    }
  `,
})
export class FullscreenMapPage implements AfterViewInit {
  protected divElement = viewChild<ElementRef>('map');
  protected zoomValue = signal<number>(14);
  protected cordinates = signal({
    lat: -71.5578,
    lng: 42.35816,
  });
  protected map = signal<mapboxgl.Map | null>(null);

  zomEffect = effect(() => {
    if (!this.map()) return;
    this.map()?.zoomTo(this.zoomValue());
  });

  ngAfterViewInit(): void {
    if (!this.divElement()?.nativeElement) return;
    const element = this.divElement()!.nativeElement;
    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [this.cordinates().lat, this.cordinates().lng], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: this.zoomValue(), // starting zoom
    });
    this.mapListeners(map);
  }

  protected mapListeners(map: mapboxgl.Map) {
    map.on('zoomend', (event) => {
      // * Evento de cuando se hace zom en el mapa
      const newZom = event.target.getZoom();
      this.zoomValue.set(newZom);
    });

    map.on('moveend', (event) => {
      // * Evento cuando el mapa se deja de mover
      const mapCenter = map.getCenter();
      this.cordinates.set({ lat: mapCenter.lat, lng: mapCenter.lng });
    });

    map.addControl(new mapboxgl.ScaleControl())
    this.map.set(map);
  }
}
