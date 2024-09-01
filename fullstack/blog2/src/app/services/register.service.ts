import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registerUserUrl = 'http://127.0.0.1:8000/api/register'
  constructor(private http:HttpClient) { }


  registerUser(user:User):Observable<any>{
    console.log("Usao u ovu metodu servisa");
    return this.http.post<any>(this.registerUserUrl,{
      "name":user.name,
      "email":user.email,
      "password":user.password 
    });
  }
}
