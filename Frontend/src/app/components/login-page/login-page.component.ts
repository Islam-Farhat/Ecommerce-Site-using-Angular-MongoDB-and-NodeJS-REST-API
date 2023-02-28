import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router,public cookiesService:CookieService,private userService:UserService){}
  ngOnInit(): void {
   
  }

  userForm=new FormGroup({
    username:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)]),
  });
  get getusername(){
    return this.userForm.controls["username"];
  }
  get getPassword(){
    return this.userForm.controls["password"];
  }
  userToken:any="";
  body:any;
  errorFlag: boolean = false;
  userflag: boolean = false;
  parentName: any=""; 
  login(e:any){
    e.preventDefault();
    
    if (this.userForm.status == "VALID")
      this.body = {
        userName: this.userForm.value.username,
        password:this.userForm.value.password
      }
     
     this.userService.loginUser(this.body).subscribe((response)=>{
            this.userToken=response;
            const dateNow = new Date();
            dateNow.setHours(dateNow.getHours() + 12);
            this.cookiesService.set('userToken', this.userToken ,dateNow)
            this.userflag = true;
            this.parentName = this.userForm.value.username;
            this.router.navigateByUrl('/cart');
     }, error => { this.errorFlag = true; })
    
    
  }
}
