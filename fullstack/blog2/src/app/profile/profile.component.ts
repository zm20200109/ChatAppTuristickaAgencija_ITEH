import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AranzmanService } from '../services/aranzman.service';
import { Aranzman } from '../models/aranzman';
import { ShareService } from '../services/shared/share.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Putovanje } from '../models/putovanje';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

constructor(private userService: UserService,private aranzmanService:AranzmanService, private shareService: ShareService, private authService: AuthService, private router:Router){}

buttonClick = true;

userRole = this.shareService.userRole;
userData:any;
userAranzmani:Putovanje[]=[];

localAranzmani:Aranzman[] = [];

pomPutovanje:Putovanje;

ngOnInit(): void{

  this.getUserInfo(); //pokusaj nekako svaki put kada se ova strana inicijalizuje da u ngOnInit vadis rolu usera
  this.fetchUserAranzmani(); //vraca sva putovanja nekog usera 


  if(this.shareService.getAranzman()!=null){
  this.localAranzmani = this.shareService.getAranzman();
    
}
}

getUserInfo(){
  this.userService.getProfile().subscribe(
    (res) => {
      this.userData=res;
      console.log("RESSS",res);
    }
  )
}



fetchUserAranzmani(): void {
  
  this.aranzmanService.getAranzmaniUser().subscribe(
  (data) => {

    this.userAranzmani = data;
    console.log(this.userAranzmani);
  },
  (error) => {
    console.log("Error fetching brosure:",error);
  }



  );




}


logout(){
  this.authService.logout().subscribe(
  (res) => {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
    console.log(res);
   
  }
  );
}



rezervisi(aranzman:Aranzman) {
console.log("OVO JE ARANZMAN:",aranzman); //nije dobro prosledjen aranzman
console.log("OVO JD USER ID:", this.shareService.getUID());
//console.log("OVO JE USER ULGOVANI ID",this.authService.getUlogovaniID());



this.aranzmanService.insertPutovanje(aranzman.id,this.shareService.getUID()).subscribe(
(res)=>{
 // this.router.navigate(['home']);
 //this.location.reload();
  
console.log(res);
}
);
//brisanje iz lokalnog niza datog aranzmana 

this.localAranzmani = this.localAranzmani.filter(item => item.id !== aranzman.id);

this.fetchUserAranzmani(); //vraca sva putovanja nekog usera 


}
onRemoveFromCart(aranzman:Aranzman){
  this.localAranzmani = this.localAranzmani.filter(item => item.id !== aranzman.id);

}

onButtonOtkazi(p:Putovanje){
  this.aranzmanService.destroyPutovanje(p).subscribe((res)=>{
    this.router.navigate(['home']);

  });
  
}

}



