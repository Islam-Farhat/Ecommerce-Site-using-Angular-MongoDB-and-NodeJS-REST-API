import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 URL: string = "http://localhost:8080"
  constructor(private client: HttpClient) { }

  addUser(body: any) {
    
    return this.client.post(`${this.URL}/register`,body)
  }
  loginUser(body: any) {
    return this.client.post(`${this.URL}/login`,body)
  }

}
