import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.css']
})
export class DashboardNavComponent {
  flag:boolean=false;
  constructor(private router: Router,public cookiesService:CookieService)
  {}
  logOut()
  {
    const dateNow = new Date();
    dateNow.setHours(dateNow.getHours() - 1);
    this.cookiesService.set('token', "",dateNow);
    this.router.navigateByUrl('/home');
  }
}
