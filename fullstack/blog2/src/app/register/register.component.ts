import { Component } from '@angular/core';
import { User } from '../models/user';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  userRegister:User = {
    "name":"",
    "email":"",
    "password":"",
    "id":0,
    "user_role":"",
  }
  constructor(private registerService:RegisterService, private router:Router){

  }

  registerUser(){
    console.log("Registrovani user:",this.userRegister);
    this.registerService.registerUser(this.userRegister).subscribe(
      data => {
        console.log("Novi korisnik:",data) 
        localStorage.setItem('access_token',data.access_token);
        alert("Registracija je uspešna!");
        this.resetForm();
        this.router.navigate(['/login']);
      },
      error =>{
        console.log("GRESKA!",error);
        this.resetForm();
      }
    );
  }

  resetForm(){
    this.userRegister = {
      "name":"",
      "email":"",
      "password":"",
      "id":0,
      "user_role":"",
    }
  }


}
