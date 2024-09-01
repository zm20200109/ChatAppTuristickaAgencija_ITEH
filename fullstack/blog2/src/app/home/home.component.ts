import { Component, OnInit } from '@angular/core';
import { TemperatureService } from '../services/temperature.service';
import { Temperature } from '../models/temperature';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [DatePipe]
})
export class HomeComponent implements OnInit{

  temperatures:Temperature;
  selectedCity:string="Belgrade";
  cities = ["Belgrade","Havana","Paris","Rome","Beijing","Santorini","Seychelles"];
  filteredTimes:string[]=[];
  filteredTemperatures:number[]=[];

  currentPage: number = 0;
  pageSize: number = 2;
  constructor(private tempService:TemperatureService, private datePipe: DatePipe){}


  ngOnInit(): void {
    this.tempService.getTemperature("Belgrade").subscribe(data=>{console.log("Data:",data);this.temperatures = data});
  }

  onCityChange(event:Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCity = target.value;
    this.tempService.getTemperature(this.selectedCity).subscribe(data=>{this.temperatures=data;});
    
  }

  formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }


}
