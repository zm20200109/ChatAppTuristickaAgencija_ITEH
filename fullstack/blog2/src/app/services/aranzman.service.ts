import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Putovanje } from '../models/putovanje';
import { Aranzman } from '../models/aranzman';

@Injectable({
  providedIn: 'root'
})
export class AranzmanService {

  url: string = 'http://localhost:8000/api';
  constructor(private http:HttpClient){}

  getAranzmani(): Observable<any>{

    return this.http.get(`${this.url}/aranzmani`);
  }

  getAranzmani2(): Observable<Aranzman[]>{

    return this.http.get<Aranzman[]>(`${this.url}/aranzmani`);
  }


  getAranzmaniUser():Observable<any>{
    return this.http.get(`${this.url}/moja_putovanja`); //vraca listu putovanja 
  }

  insertPutovanje(aranzman_id:number,user_id:number):Observable<any>{
    return this.http.post(`${this.url}/sacuvaj_putovanje`,{aranzman_id,user_id}); //cuva novo putovanje - spaja aranzman i usera 
  }


  destroyPutovanje(putovanje:Putovanje):Observable<any>{
    return this.http.delete(`${this.url}/obrisi_putovanje/${putovanje.id}`);
  }
}
