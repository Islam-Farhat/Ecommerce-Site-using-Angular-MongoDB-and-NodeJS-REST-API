import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
  


  
  
export class RegisterPageComponent {
  flag: boolean = false;

  constructor(private router: Router, public userServices: UserService, public activatedRoute: ActivatedRoute) {
    
  }
  userForm=new FormGroup({
    fullname:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    city:new FormControl('',[Validators.required]),
    street:new FormControl('',[Validators.required]),
    username:new FormControl('',[Validators.required]),
    phone:new FormControl('',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)]),

  });

  get getfullname(){
    return this.userForm.controls["fullname"];
  }
  get getemail(){
    return this.userForm.controls["email"];
  }
  get getecity(){
    return this.userForm.controls["city"];
  }
  get getstreet(){
    return this.userForm.controls["street"];
  }
  get getusername(){
    return this.userForm.controls["username"];
  }
  get getphone() {
    return this.userForm.controls["phone"];
  }
  get getpassword(){
    return this.userForm.controls["password"];
  }
  body: any;
  
   
  
  
  


  adduser() {
    
    if (this.userForm.status=="VALID") {
    
  this.body ={
  
   fullName: this.userForm.value.fullname,
   userName:this.userForm.value.username,
   email:this.userForm.value.email,
    password: this.userForm.value.password,
   phone:this.userForm.value.phone,
   address: {
     street: this.userForm.value.street,
     city:this.userForm.value.city
         }
   }
      
      this.userServices.addUser(this.body).subscribe(res =>this.router.navigate(['/login']) ,
        err => this.flag=true)
    }
    

    }



   login(e:any)
  {
    e.preventDefault();
  }
}
