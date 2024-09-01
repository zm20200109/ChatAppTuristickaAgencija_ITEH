import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Temperature } from '../models/temperature';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  locations: { [key: string]: { latitude: number; longitude: number } } = {
    "Belgrade":{
      "latitude":44.8176,
      "longitude":20.4633
    }, 
    "Havana":{
      "latitude":23.1136,
      "longitude":-82.3666
    },
    "Paris":{
      "latitude":48.8566,
      "longitude":2.3522
    },
    "Rome":{
      "latitude":41.9028,
      "longitude":12.4964
    },
    "Beijing":{
      "latitude":39.9042,
      "longitude":116.4074
    },
    "Santorini":{
      "latitude":36.3932,
      "longitude":25.4615
    },
    "Seychelles":{
      "latitude":-4.6796,
      "longitude":55.4920
    },

  }

  apiUrl = "https://api.open-meteo.com/v1/forecast"
  apiUrl2 = "https://api.open-meteo.com/v1/forecast"
  constructor(private http: HttpClient) { }

  getTemperature(city:string):Observable<Temperature>{
    const lat = this.locations[city].latitude
    const lon = this.locations[city].longitude 
    //?latitude=23.1136&longitude=-82.3666&daily=temperature_2m_min&daily=temperature_2m_max
    const url = `${this.apiUrl}?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`;
    const url2 = `${this.apiUrl}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min&daily=temperature_2m_max`
    console.log(this.http.get<Temperature>(url2));
    return this.http.get<Temperature>(url2);
  }

}
