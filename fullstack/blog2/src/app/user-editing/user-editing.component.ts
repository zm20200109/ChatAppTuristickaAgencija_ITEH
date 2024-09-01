import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { ShareService } from '../services/shared/share.service';

@Component({
  selector: 'app-user-editing',
  templateUrl: './user-editing.component.html',
  styleUrl: './user-editing.component.scss'
})
export class UserEditingComponent {

  userID: any;
  userSelected: any;

  constructor(private route: ActivatedRoute, private userService:UserService, private router:Router, private shareService: ShareService){}

  ngOnInit(){
    this.userID = this.route.snapshot.paramMap.get('id');
    //alert(this.userID);
    this.getUser();
  }

  

  getUser(){
    this.userService.getUser(this.userID).subscribe(

      (res) => {
        this.userSelected=res;
        console.log(res);
      }
    );


  }



  updateUser(){
    var new_data = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      password: (document.getElementById("password") as HTMLInputElement).value,
    }

    this.userService.updateUser(this.userID,new_data).subscribe(
      (res) => {console.log(res);
      this.shareService.userRole="admin";
      this.router.navigate(['/profile']);

      }
    );

    
  

  }

}
