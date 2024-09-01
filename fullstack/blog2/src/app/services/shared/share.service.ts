import { Injectable } from '@angular/core';
import { Aranzman } from '../../models/aranzman';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  aranzmani:Aranzman[]=[];
  userID:number;
 userRole:string;


  constructor() { }

  setAranzman(data:Aranzman){
    this.aranzmani.push(data);
  }

  getAranzman(){
    return this.aranzmani;
  }

  setUID(num:number){
    this.userID=num;
  }

  getUID(){
    return this.userID;
  }

  
  
}
