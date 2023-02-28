import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.css']
})
export class AdminLoginPageComponent implements OnInit{
constructor(private router: Router,public loginService:LoginService,public cookiesService:CookieService){}
  ngOnInit(): void {
    if (this.cookiesService.get('token')) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  userForm=new FormGroup({
    username:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.minLength(3)]),
  });
  get getusername(){
    return this.userForm.controls["username"];
  }
  get getPassword(){
    return this.userForm.controls["password"];
  }
  errorFlag: boolean = false;
  
  token:any="";
  body:any={userName:"",password:""};
  login(e:any){
    e.preventDefault();
    if(this.userForm.status=="VALID"){
      this.body.userName=this.userForm.value.username;
      this.body.password=this.userForm.value.password;
      this.loginService.loginAdmin(this.body).subscribe((response)=>{
            this.token=response;
            const dateNow = new Date();
            dateNow.setHours(dateNow.getHours() + 12);
            this.cookiesService.set('token', this.token ,dateNow)
            this.router.navigateByUrl('/dashboard');

      },error=>{ this.errorFlag = true;})
    }


  }
}
