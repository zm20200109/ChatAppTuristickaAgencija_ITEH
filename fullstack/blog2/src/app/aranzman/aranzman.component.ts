import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AranzmanService } from '../services/aranzman.service';
import { Aranzman } from '../models/aranzman';
import { Router } from '@angular/router';
import { ShareService } from '../services/shared/share.service';
import { FlightsService } from '../services/flights.service';
import { Flight } from '../models/flight';

@Component({
  selector: 'app-aranzman',
  templateUrl: './aranzman.component.html',
  styleUrl: './aranzman.component.scss'
})
export class AranzmanComponent implements OnInit {

//@Input() aranzmani: Aranzman[]=[];
aranzmani: Aranzman[] = [];
paginatedAranzmani: Aranzman[] = []; 
currentPage: number = 0;
pageSize: number = 2;
letoviIndicator:boolean = false;

flights:any[]=[];
filteredFlights: any[] = [];

buttonClick=true;

filterIndicator:boolean=false;

filters = {
  destination: '',
  price: null,
  dateFrom: new Date(),
  dateTo: new Date(),
  transport: ''
};

filteredAranzmani: Aranzman[] = [];

@Input() aranzman: Aranzman;
constructor(private aranzmanService: AranzmanService, private router:Router, private shareService:ShareService, private flightService:FlightsService){
}

//u vreme incijializacije stranice
ngOnInit(){

this.fetchAranzmani();
//this.paginatedAranzmani = this.aranzmani.slice(0,this.pageSize);

this.updatePaginatedAranzmani();
this.loadFlights();
}

updatePaginatedAranzmani():void{
  const startIndex = this.currentPage * this.pageSize; //0
  const endIndex = startIndex  + this.pageSize; //3
  this.paginatedAranzmani = this.aranzmani.slice(startIndex, endIndex);
}

nextPage():void{
  if ((this.currentPage+1)*this.pageSize < this.aranzmani.length){ //npr ako ima 6 aranzmana onda je druga strana 1 pa jos +1 je 2 i to pomnozis sa 3 sto je vel strane onda je do sada proteklo 6 aranzmana. ova metoda moze da ide next ako ima jos aranzmana tj, ako lista ima vise od 6 aranzjana
    this.currentPage++;
    this.updatePaginatedAranzmani(); // update curr pagea koji uzrokuje pravljenje novog slajsa 
  }
}

prevPage():void{
  if(this.currentPage>0){
    this.currentPage--;
    this.updatePaginatedAranzmani();
  }

}


fetchAranzmani(): void {

  this.aranzmanService.getAranzmani().subscribe(
  (data) => {

    this.aranzmani = data;
    this.paginatedAranzmani = this.aranzmani.slice(0,this.pageSize);
    console.log(this.aranzmani);
  },
  (error) => {
    console.log("Error fetching aranzmani:",error);
  });
}

applyFilters(): void {
  this.filterIndicator = true;
  this.filteredAranzmani = this.aranzmani.filter(aranzman => {
    return (this.filters.destination ? aranzman.destinacija.toLowerCase().includes(this.filters.destination.toLowerCase()) : true) &&
           (this.filters.price ? aranzman.cena <= this.filters.price : true) &&
           (this.filters.dateFrom,this.filters.dateTo ? ((this.filters.dateFrom < aranzman.datum) && (aranzman.datum<= this.filters.dateTo)) : true) 
           //(this.filters.transport ? aranzman.prevoz.toLowerCase().includes(this.filters.transport.toLowerCase()) : true);
  });
  console.log(this.filteredAranzmani);
  console.log(this.filters);
}

onAddToCart(aranzman:Aranzman) {

  if(!localStorage.getItem('token')){
    this.router.navigate(['/login']); 
    return;
  }


  if(aranzman.br_mesta > 0){
    //console.log(aranzman);
    aranzman.br_mesta--;
    this.shareService.setAranzman(aranzman);
    this.router.navigate(['/profile']); 

  }

  for( const a of this.aranzmani){
    console.log(a);
  }
}

onRemoveFromCart(aranzman:Aranzman) {
  aranzman.br_mesta++;

  for( const a of this.aranzmani){
    console.log(a);
  }
}


getTotalPages(): number {
  return Math.ceil(this.aranzmani.length / this.pageSize);
}



loadFlights():void{
  this.letoviIndicator=true;
  this.flightService.getCurrentFlights().subscribe(response => {
    this.flights = response;
    console.log(response);
    
  });
}



}
