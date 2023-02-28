import { CartService } from './../../services/cart.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() nItem = this.cartService.countItems()
  constructor(public cartService: CartService) {
  }
  ngOnInit(): void {
     
  }
  @Input() Name: any = "";
 
}
