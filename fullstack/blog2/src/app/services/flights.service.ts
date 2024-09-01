import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private apiUrl = 'https://opensky-network.org/api/states/all';

  private api2 = 'https://travelbriefing.org/api'
  constructor(private http:HttpClient) { }

  getCurrentFlights(): Observable<any> {
    return this.http.get<any>(this.api2);
  }

}
