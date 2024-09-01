import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AranzmanService } from '../services/aranzman.service';
import { Aranzman } from '../models/aranzman';
import {Response} from '../models/response';
import { PlanElement } from '../models/plan-element';
import {saveAs} from 'file-saver';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{
  query: string = '';
  response: Response;
  aranzmani:Aranzman[] = [];
  travelPlan: PlanElement[] = [];

  paginatedPlan: PlanElement[] = []; 
  currentPage: number = 0;
  pageSize: number = 3;

  planIndicator = false;
  arangementIndicator = false; 

  ngOnInit(): void {
    this.updatePaginatedPlan();
  }

  updatePaginatedPlan():void{
    const startIndex = this.currentPage * this.pageSize; //0
    const endIndex = startIndex  + this.pageSize; //3
    this.paginatedPlan = this.travelPlan.slice(startIndex, endIndex);
  }
  
  nextPage():void{
    if ((this.currentPage+1)*this.pageSize < this.travelPlan.length){ //npr ako ima 6 aranzmana onda je druga strana 1 pa jos +1 je 2 i to pomnozis sa 3 sto je vel strane onda je do sada proteklo 6 aranzmana. ova metoda moze da ide next ako ima jos aranzmana tj, ako lista ima vise od 6 aranzjana
      this.currentPage++;
      this.updatePaginatedPlan(); // update curr pagea koji uzrokuje pravljenje novog slajsa 
    }
  }
  
  prevPage():void{
    if(this.currentPage>0){
      this.currentPage--;
      this.updatePaginatedPlan();
    }
  
  }
  
  getTotalPages(): number {
    return Math.ceil(this.travelPlan.length / this.pageSize);
  }


  exportToJson(){
    const blob = new Blob([JSON.stringify(this.travelPlan, null, 2)], { type: 'application/json' });
    saveAs(blob,'travel-plan.json');
  }

  constructor(private travelChatService: ChatService, private aranzmanService: AranzmanService) { }

  async sendQuery(): Promise<any> {
    this.arangementIndicator = false;
    this.planIndicator = false;
      this.response = await this.travelChatService.getTravelInfo(this.query).toPromise();

    console.log("Response:",this.response);
    if (this.response.response.includes("all_arangements")){
      this.arangementIndicator = true;
      console.log("Includes...");
      this.aranzmanService.getAranzmani2().subscribe(data=>{console.log("Aranzmani:",data); this.aranzmani=data;});
      //console.log(this.aranzmani);
      //return this.aranzmani;
    }
    else{
      this.planIndicator = true;
      this.travelPlan = JSON.parse(this.response.response);
      console.log(this.travelPlan);
    }

  }
  
}
