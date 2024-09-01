import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { FeatureCollection } from 'geojson';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{

  private map:any;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap():void{
    this.map = L.map('map').setView([44.8176, 20.4633], 13); // početnu lokaciju  +  nivo zoom-a

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.addMarkers();
    this.addCustomLayer();

  }
  private addMarkers(): void {
    L.marker([44.8176, 20.4633]) // dodat marker za lokaciju turisticke agencije 
      .addTo(this.map)
      .bindPopup('<b>Forever Travell</b><br>Beograd, Srbija')
      .openPopup();
  }

  private addCustomLayer(): void {
    
    const geojsonData: FeatureCollection = { //GeoJSON objekat mora biti tipa FeatureCollection!
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [-0.09, 51.5] // Longitude, Latitude format
          }
        }
      ]
    };

    
    L.geoJSON(geojsonData).addTo(this.map); // dodati GeoJSON objekat na mapu 
  }
  




}
