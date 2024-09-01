import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  private apiUrl = "http://127.0.0.1:8000/api/chat"
  constructor(private http:HttpClient) { }

  getTravelInfo(prompt:string):Observable<any>{
    //console.log(prompt);
    //console.log(this.http.post<any>(this.apiUrl,{'prompt':prompt}));
    return this.http.post<any>(this.apiUrl,{'prompt':prompt});
  }
}
