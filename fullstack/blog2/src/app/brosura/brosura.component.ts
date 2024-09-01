import { Component } from '@angular/core';
import { Brosura } from '../models/brosura';
import { BrosuraService } from '../services/brosura.service';

@Component({
  selector: 'app-brosura',
  templateUrl: './brosura.component.html',
  styleUrl: './brosura.component.scss'
})
export class BrosuraComponent {


  brosure: Brosura[] = [];


  constructor(private brosuraService: BrosuraService){}
  
  //u vreme incijializacije stranice
  ngOnInit(){
  
  this.fetchBrosure();
  console.log(this.brosure);
  
  
  }
  
  
  
  
  fetchBrosure(): void {
  
    this.brosuraService.getBrosure().subscribe(
    (data) => {
  
      this.brosure = data;
      console.log(this.brosure);
    },
    (error) => {
      console.log("Error fetching brosure:",error);
    }
  
  
  
    );
  
  
  
  
  }



}