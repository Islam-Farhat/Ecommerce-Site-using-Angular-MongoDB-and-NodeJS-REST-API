import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  ARIUrl:string="http://localhost:8080/login"
  constructor(public client:HttpClient) {
  }
  loginAdmin(body:any)
  {
    
    return this.client.post(this.ARIUrl,body)
  }
}
